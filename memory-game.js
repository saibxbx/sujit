// ==========================================
// MEMORY CARD GAME
// ==========================================

(function () {
    const gridElement = document.getElementById('memoryGrid');
    const movesElement = document.getElementById('memoryMoves');
    const timeElement = document.getElementById('memoryTime');
    const resetButton = document.getElementById('memoryReset');

    // Card symbols (programming themed)
    const symbols = ['💻', '🎮', '🚀', '⚡', '🔥', '💡', '🎯', '⭐'];

    // Game state
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime = null;
    let timerInterval = null;
    let gameActive = false;

    // ==========================================
    // GAME INITIALIZATION
    // ==========================================

    function initGame() {
        // Reset state
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        startTime = null;
        gameActive = true;

        if (timerInterval) clearInterval(timerInterval);

        movesElement.textContent = '0';
        timeElement.textContent = '0:00';

        // Create card pairs
        const cardPairs = [...symbols, ...symbols];

        // Shuffle cards
        cards = shuffleArray(cardPairs.map((symbol, index) => ({
            id: index,
            symbol: symbol,
            flipped: false,
            matched: false
        })));

        renderCards();
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // ==========================================
    // RENDERING
    // ==========================================

    function renderCards() {
        gridElement.innerHTML = '';

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.id = card.id;

            if (card.flipped || card.matched) {
                cardElement.classList.add('flipped');
            }

            if (card.matched) {
                cardElement.classList.add('matched');
            }

            const frontFace = document.createElement('div');
            frontFace.className = 'card-front';
            frontFace.textContent = '?';

            const backFace = document.createElement('div');
            backFace.className = 'card-back';
            backFace.textContent = card.symbol;

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            cardElement.addEventListener('click', () => handleCardClick(card.id));

            gridElement.appendChild(cardElement);
        });
    }

    // ==========================================
    // GAME LOGIC
    // ==========================================

    function handleCardClick(cardId) {
        if (!gameActive) return;

        const card = cards.find(c => c.id === cardId);

        // Ignore if already flipped or matched
        if (card.flipped || card.matched) return;

        // Ignore if two cards already flipped
        if (flippedCards.length >= 2) return;

        // Start timer on first move
        if (!startTime) {
            startTime = Date.now();
            startTimer();
        }

        // Flip card
        card.flipped = true;
        flippedCards.push(card);
        renderCards();

        // Check for match
        if (flippedCards.length === 2) {
            moves++;
            movesElement.textContent = moves;

            setTimeout(checkMatch, 600);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.symbol === card2.symbol) {
            // Match found
            card1.matched = true;
            card2.matched = true;
            matchedPairs++;

            // Check for win
            if (matchedPairs === symbols.length) {
                endGame();
            }
        } else {
            // No match - flip back
            card1.flipped = false;
            card2.flipped = false;
        }

        flippedCards = [];
        renderCards();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    function endGame() {
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);

        setTimeout(() => {
            alert(`🎉 Congratulations! You won!\n\nMoves: ${moves}\nTime: ${timeElement.textContent}`);
        }, 500);
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    resetButton.addEventListener('click', initGame);

    // Initialize on load
    initGame();

    // Export for global access
    window.memoryGame = {
        reset: initGame,
        active: () => gameActive,
        isPlaying: () => gameActive && flippedCards.length > 0
    };
})();
