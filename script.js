// WaterWall - Single Page App
class WaterWallApp {
    constructor() {
        this.games = [];
        this.filteredGames = [];
        this.currentView = 'home';
        this.currentGame = null;
        this.ratings = JSON.parse(localStorage.getItem('waterwall_ratings')) || {};
        
        this.init();
    }

    async init() {
        await this.loadGames();
        this.setupEventListeners();
        this.renderHome();
        this.populateCategories();
    }

    async loadGames() {
        try {
            const response = await fetch('games.json');
            this.games = await response.json();
            this.filteredGames = [...this.games];
        } catch (error) {
            console.error('Error loading games:', error);
            // Fallback to sample data if JSON file doesn't exist
            this.games = this.getSampleGames();
            this.filteredGames = [...this.games];
        }
    }

    getSampleGames() {
        return [
            {
                id: 1,
                title: "Sample Game 1",
                description: "This is a sample game description for demonstration purposes.",
                category: "Action",
                tags: ["action", "adventure", "arcade"],
                thumbnail: "https://via.placeholder.com/300x200/00ffff/000000?text=Game+1",
                embedUrl: "https://example.com/game1"
            },
            {
                id: 2,
                title: "Sample Game 2",
                description: "Another sample game to show the grid layout and functionality.",
                category: "Puzzle",
                tags: ["puzzle", "strategy", "brain"],
                thumbnail: "https://via.placeholder.com/300x200/0080ff/000000?text=Game+2",
                embedUrl: "https://example.com/game2"
            },
            {
                id: 3,
                title: "Sample Game 3",
                description: "A third sample game to demonstrate the responsive grid system.",
                category: "Racing",
                tags: ["racing", "speed", "cars"],
                thumbnail: "https://via.placeholder.com/300x200/00ffff/000000?text=Game+3",
                embedUrl: "https://example.com/game3"
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterGames();
        });

        // Category filter
        document.getElementById('categorySelect').addEventListener('change', (e) => {
            this.filterGames();
        });

        // Back button
        document.getElementById('backButton').addEventListener('click', () => {
            this.navigateToHome();
        });

        // Rating stars
        document.getElementById('ratingStars').addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                this.rateGame(parseInt(e.target.dataset.rating));
            }
        });
    }

    filterGames() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedCategory = document.getElementById('categorySelect').value;

        this.filteredGames = this.games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm) ||
                                game.description.toLowerCase().includes(searchTerm) ||
                                game.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !selectedCategory || game.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });

        this.renderGamesGrid();
    }

    populateCategories() {
        const categories = [...new Set(this.games.map(game => game.category))];
        const select = document.getElementById('categorySelect');
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }

    renderHome() {
        this.currentView = 'home';
        this.showView('homeView');
        this.hideView('gameView');
        document.getElementById('backButton').style.display = 'none';
        this.renderGamesGrid();
    }

    renderGamesGrid() {
        const grid = document.getElementById('gamesGrid');
        grid.innerHTML = '';

        if (this.filteredGames.length === 0) {
            grid.innerHTML = `
                <div class="no-games">
                    <h3>No games found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            `;
            return;
        }

        this.filteredGames.forEach(game => {
            const gameCard = this.createGameCard(game);
            grid.appendChild(gameCard);
        });
    }

    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card fade-in';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-category">${game.category}</span>
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.openGame(game);
        });
        
        return card;
    }

    openGame(game) {
        this.currentGame = game;
        this.currentView = 'game';
        this.showView('gameView');
        this.hideView('homeView');
        document.getElementById('backButton').style.display = 'block';
        
        this.renderGamePage(game);
    }

    renderGamePage(game) {
        // Update game information
        document.getElementById('gameTitle').textContent = game.title;
        document.getElementById('gameCategory').textContent = game.category;
        document.getElementById('gameDescription').textContent = game.description;
        
        // Render tags
        const tagsContainer = document.getElementById('gameTags');
        tagsContainer.innerHTML = '';
        game.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'game-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
        
        // Load game iframe
        const gameFrame = document.getElementById('gameFrame');
        gameFrame.src = game.embedUrl;
        
        // Load ratings
        this.loadGameRatings(game.id);
        
        // Smooth transition
        document.getElementById('gameView').classList.add('fade-in');
    }

    loadGameRatings(gameId) {
        const gameRatings = this.ratings[gameId] || { ratings: [], average: 0 };
        const ratingCount = gameRatings.ratings.length;
        const averageRating = gameRatings.average;
        
        document.getElementById('ratingCount').textContent = `${ratingCount} rating${ratingCount !== 1 ? 's' : ''}`;
        document.getElementById('averageRating').textContent = averageRating.toFixed(1);
        
        // Update star display
        this.updateStarDisplay(gameRatings.ratings);
    }

    updateStarDisplay(userRatings) {
        const stars = document.querySelectorAll('.star');
        const userRating = userRatings.length > 0 ? userRatings[userRatings.length - 1] : 0;
        
        stars.forEach((star, index) => {
            const starValue = index + 1;
            star.classList.remove('active');
            if (starValue <= userRating) {
                star.classList.add('active');
            }
        });
    }

    rateGame(rating) {
        if (!this.currentGame) return;
        
        const gameId = this.currentGame.id;
        if (!this.ratings[gameId]) {
            this.ratings[gameId] = { ratings: [], average: 0 };
        }
        
        // Add new rating
        this.ratings[gameId].ratings.push(rating);
        
        // Calculate new average
        const total = this.ratings[gameId].ratings.reduce((sum, r) => sum + r, 0);
        this.ratings[gameId].average = total / this.ratings[gameId].ratings.length;
        
        // Save to localStorage
        localStorage.setItem('waterwall_ratings', JSON.stringify(this.ratings));
        
        // Update display
        this.loadGameRatings(gameId);
        
        // Visual feedback
        this.showRatingFeedback(rating);
    }

    showRatingFeedback(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            const starValue = index + 1;
            if (starValue <= rating) {
                star.style.animation = 'none';
                star.offsetHeight; // Trigger reflow
                star.style.animation = 'fadeIn 0.3s ease-out';
            }
        });
    }

    navigateToHome() {
        this.renderHome();
        // Clear iframe source to stop any running games
        document.getElementById('gameFrame').src = '';
    }

    showView(viewId) {
        document.getElementById(viewId).classList.add('active');
    }

    hideView(viewId) {
        document.getElementById(viewId).classList.remove('active');
    }

    // Hash routing for direct game access
    setupRouting() {
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
        
        // Handle initial route
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);
        
        if (hash.startsWith('game/')) {
            const gameId = parseInt(hash.split('/')[1]);
            const game = this.games.find(g => g.id === gameId);
            if (game) {
                this.openGame(game);
            } else {
                this.renderHome();
            }
        } else {
            this.renderHome();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WaterWallApp();
    
    // Make app globally accessible for debugging
    window.waterWallApp = app;
});

// Add some utility functions for smooth animations
function addFadeInAnimation(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('.game-thumbnail');
    images.forEach(img => {
        if (img.src) {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        }
    });
}

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element) {
    element.innerHTML = '';
}
