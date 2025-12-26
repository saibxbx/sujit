// ==========================================
// BOOK PORTFOLIO - TURN.JS INTEGRATION
// ==========================================

let soundEnabled = true;
let currentPage = 0;

// Hide loading screen when everything is ready
window.addEventListener('load', function () {
    setTimeout(function () {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 2000); // 2 second delay to show the loading animation
});

$(document).ready(function () {
    // Initialize the book
    $("#book").turn({
        width: $(window).width(),
        height: $(window).height(),
        autoCenter: true,
        elevation: 50,
        gradients: true,
        duration: 1000,
        pages: 7,
        acceleration: false, // Disable acceleration to prevent scroll issues
        when: {
            turning: function (event, page, view) {
                // Play page flip sound
                if (soundEnabled) {
                    playPageFlipSound();
                }

                // Update current page
                currentPage = page - 1;

                // Update bookmark active state
                updateBookmarks();
            },
            turned: function (event, page, view) {
                console.log('Current page:', page);
            }
        }
    });

    // Responsiveness
    $(window).resize(function () {
        resizeBook();
    });

    // Initial resize
    resizeBook();

    // Bookmark navigation
    $('.bookmark').on('click', function () {
        const targetPage = parseInt($(this).data('page')) + 1;
        $("#book").turn("page", targetPage);
    });

    // Removed auto-turn on scroll - it was causing unwanted page turns
    // Users can use bookmarks or arrow keys to navigate instead

    // Prevent mouse wheel from turning pages - allow normal scrolling within page content
    $('#book').on('wheel', function (e) {
        e.stopPropagation();
    });
    
    // Also prevent on page content
    $('.page-content').on('wheel', function (e) {
        e.stopPropagation();
    });

    // Sound toggle
    $('#soundToggle').on('click', function () {
        soundEnabled = !soundEnabled;
        $(this).toggleClass('muted');
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    });

    // Keyboard navigation - but NOT when games are active
    $(document).keydown(function (e) {
        // Check if snake game is running
        if (window.snakeGame && window.snakeGame.running && window.snakeGame.running()) {
            return; // Don't turn pages while playing snake
        }
        
        // Check if memory game is active (cards are being flipped)
        if (window.memoryGame && window.memoryGame.isPlaying && window.memoryGame.isPlaying()) {
            return; // Don't turn pages while playing memory game
        }
        
        // Check if the active element is inside a game container
        const activeElement = document.activeElement;
        const gameContainer = activeElement ? activeElement.closest('.game-container') : null;
        if (gameContainer) {
            return; // Don't turn pages when focused on game elements
        }

        if (e.keyCode === 37) { // Left arrow
            $("#book").turn("previous");
        } else if (e.keyCode === 39) { // Right arrow
            $("#book").turn("next");
        }
    });

    // Touch/Swipe support for mobile - DISABLED on game pages
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // Check if we're on a game page
    function isOnGamePage() {
        const currentPageNum = $("#book").turn("page");
        return currentPageNum === 3 || currentPageNum === 4; // Snake and Memory pages
    }

    // Check if touch is on game elements
    function isTouchOnGame(e) {
        const target = e.target;
        return $(target).closest('#snakeCanvas, .game-container, .game-page, .memory-grid, .control-btn, .mobile-controls').length > 0;
    }

    $('#book').on('touchstart', function (e) {
        // If on game page or touching game elements, don't track for page swipe
        if (isOnGamePage() || isTouchOnGame(e)) {
            touchStartX = 0;
            touchStartY = 0;
            return;
        }
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    $('#book').on('touchmove', function (e) {
        // Prevent default on game pages to stop page from moving
        if (isOnGamePage() || isTouchOnGame(e)) {
            // Don't prevent - let the game handle it
            return;
        }
    });

    $('#book').on('touchend', function (e) {
        // If on game page or touching game elements, don't turn pages
        if (isOnGamePage() || isTouchOnGame(e)) {
            return;
        }
        
        // Check if snake game is running
        if (window.snakeGame && window.snakeGame.running && window.snakeGame.running()) {
            return;
        }

        if (touchStartX === 0) return; // No valid start point
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        
        if (diffX < -80) {
            // Swipe left - next page
            $("#book").turn("next");
        } else if (diffX > 80) {
            // Swipe right - previous page
            $("#book").turn("previous");
        }
        
        // Reset
        touchStartX = 0;
        touchEndX = 0;
    }
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function resizeBook() {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    // Use full viewport for the book
    let bookWidth = windowWidth;
    let bookHeight = windowHeight;

    // For mobile, adjust to ensure good aspect ratio
    if (windowWidth < 768) {
        bookWidth = windowWidth;
        bookHeight = windowHeight * 0.9;
    }

    $("#book").turn("size", bookWidth, bookHeight);
}

function updateBookmarks() {
    $('.bookmark').removeClass('active');
    $(`.bookmark[data-page="${currentPage}"]`).addClass('active');
}

function playPageFlipSound() {
    const audio = document.getElementById('pageFlipSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Audio play failed:', err));
    }
}

// ==========================================
// PAGE VISIBILITY HANDLERS
// ==========================================

// Stop games when page is not visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Pause any running games
        if (window.snakeGame && window.snakeGame.running) {
            // Snake game will handle this in its own file
        }
    }
});
