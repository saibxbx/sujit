// ==========================================
// SNAKE GAME - MOBILE OPTIMIZED
// ==========================================

(function () {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snakeScore');
    const highScoreElement = document.getElementById('snakeHighScore');
    const startButton = document.getElementById('snakeStart');
    const mobileControls = document.getElementById('snakeMobileControls');

    // Game constants
    const GRID_SIZE = 20;
    let TILE_COUNT = canvas.width / GRID_SIZE;

    // Game state
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameLoop = null;
    let running = false;

    // Touch tracking for swipe
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    highScoreElement.textContent = highScore;

    // Colors - Gold Theme
    const COLORS = {
        snake: '#FFD700',
        snakeHead: '#FFA500',
        food: '#FF4444',
        grid: 'rgba(255, 215, 0, 0.05)',
        background: '#1a1a1a'
    };

    // ==========================================
    // MOBILE/TOUCH DETECTION & SETUP
    // ==========================================

    function isTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0) ||
               window.matchMedia('(pointer: coarse)').matches;
    }

    function setupMobileControls() {
        // Show mobile controls on ANY touch device (including touch laptops)
        if (mobileControls) {
            if (isTouchDevice()) {
                mobileControls.style.display = 'flex';
            }
        }
    }

    // Check on load and resize
    setupMobileControls();
    window.addEventListener('resize', setupMobileControls);

    // ==========================================
    // GAME LOGIC
    // ==========================================

    function startGame() {
        if (running) return;

        // Reset game
        TILE_COUNT = Math.floor(canvas.width / GRID_SIZE);
        snake = [{ x: Math.floor(TILE_COUNT / 2), y: Math.floor(TILE_COUNT / 2) }];
        food = generateFood();
        dx = 1;
        dy = 0;
        score = 0;
        running = true;

        scoreElement.textContent = score;
        startButton.textContent = 'RESTART';

        // Start game loop
        if (gameLoop) clearInterval(gameLoop);
        gameLoop = setInterval(update, 120); // Slightly slower for mobile
    }

    function update() {
        if (!running) return;

        // Move snake
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Check wall collision
        if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
            endGame();
            return;
        }

        // Check self collision
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
        }

        // Add new head
        snake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = score;
            food = generateFood();

            // Update high score
            if (score > highScore) {
                highScore = score;
                highScoreElement.textContent = highScore;
                localStorage.setItem('snakeHighScore', highScore);
            }
        } else {
            snake.pop();
        }

        draw();
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 1;
        for (let i = 0; i <= TILE_COUNT; i++) {
            ctx.beginPath();
            ctx.moveTo(i * GRID_SIZE, 0);
            ctx.lineTo(i * GRID_SIZE, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * GRID_SIZE);
            ctx.lineTo(canvas.width, i * GRID_SIZE);
            ctx.stroke();
        }

        // Draw snake
        snake.forEach((segment, index) => {
            if (index === 0) {
                // Head with gradient
                const gradient = ctx.createRadialGradient(
                    segment.x * GRID_SIZE + GRID_SIZE / 2,
                    segment.y * GRID_SIZE + GRID_SIZE / 2,
                    0,
                    segment.x * GRID_SIZE + GRID_SIZE / 2,
                    segment.y * GRID_SIZE + GRID_SIZE / 2,
                    GRID_SIZE
                );
                gradient.addColorStop(0, '#FFA500');
                gradient.addColorStop(1, '#FF8C00');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = COLORS.snake;
            }
            
            ctx.fillRect(
                segment.x * GRID_SIZE + 1,
                segment.y * GRID_SIZE + 1,
                GRID_SIZE - 2,
                GRID_SIZE - 2
            );
        });

        // Draw food with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = COLORS.food;
        ctx.fillStyle = COLORS.food;
        ctx.beginPath();
        ctx.arc(
            food.x * GRID_SIZE + GRID_SIZE / 2,
            food.y * GRID_SIZE + GRID_SIZE / 2,
            GRID_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * TILE_COUNT),
                y: Math.floor(Math.random() * TILE_COUNT)
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }

    function endGame() {
        running = false;
        clearInterval(gameLoop);
        startButton.textContent = 'PLAY AGAIN';

        // Show game over
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 36px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = '#FFF';
        ctx.font = '20px Inter, Arial';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 20);
    }

    // ==========================================
    // CONTROLS
    // ==========================================

    function changeDirection(newDx, newDy) {
        // Prevent reversing
        if (dx === -newDx && newDx !== 0) return;
        if (dy === -newDy && newDy !== 0) return;
        dx = newDx;
        dy = newDy;
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!running) return;
        
        const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (!arrowKeys.includes(e.key)) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        switch (e.key) {
            case 'ArrowUp': changeDirection(0, -1); break;
            case 'ArrowDown': changeDirection(0, 1); break;
            case 'ArrowLeft': changeDirection(-1, 0); break;
            case 'ArrowRight': changeDirection(1, 0); break;
        }
    }, true);

    // ==========================================
    // MOBILE TOUCH CONTROLS
    // ==========================================

    // Button controls
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(btn => {
        // Use touchstart for faster response on mobile
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!running) return;

            const direction = btn.dataset.direction;
            switch (direction) {
                case 'up': changeDirection(0, -1); break;
                case 'down': changeDirection(0, 1); break;
                case 'left': changeDirection(-1, 0); break;
                case 'right': changeDirection(1, 0); break;
            }
        }, { passive: false });

        // Also keep click for non-touch
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!running) return;

            const direction = btn.dataset.direction;
            switch (direction) {
                case 'up': changeDirection(0, -1); break;
                case 'down': changeDirection(0, 1); break;
                case 'left': changeDirection(-1, 0); break;
                case 'right': changeDirection(1, 0); break;
            }
        });
    });

    // Swipe controls on canvas
    canvas.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false, capture: true });

    canvas.addEventListener('touchmove', (e) => {
        // Prevent page scrolling/swiping while touching canvas
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false, capture: true });

    canvas.addEventListener('touchend', (e) => {
        if (!running) {
            e.preventDefault();
            return;
        }
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false, capture: true });

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const minSwipe = 30; // Minimum swipe distance

        // Determine swipe direction based on which axis had more movement
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > minSwipe) {
                if (diffX > 0) {
                    changeDirection(1, 0); // Right
                } else {
                    changeDirection(-1, 0); // Left
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > minSwipe) {
                if (diffY > 0) {
                    changeDirection(0, 1); // Down
                } else {
                    changeDirection(0, -1); // Up
                }
            }
        }
    }

    // Start button
    startButton.addEventListener('click', startGame);
    startButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startGame();
    }, { passive: false });

    // Initial draw
    draw();

    // Export for global access
    window.snakeGame = {
        start: startGame,
        running: () => running
    };
})();
