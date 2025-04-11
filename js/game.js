// Game constants
const GAME_CONSTANTS = {
    TOTAL_APPLES: 10, // As per PRD
    MIN_DISTANCE_RATIO: 0.75, // As per PRD
    SNAKE_SPEED_FACTOR: 0.9,  // As per PRD
    APPLE_MOVE_SPEED: 200 // Define apple speed
};

// Debug message to check if script is running
console.log("Game.js script executing...");

// Check if Phaser is available
if (typeof Phaser === 'undefined') {
    console.error("Phaser is not defined. Make sure Phaser is loaded before game.js");
    // Display error message directly on the page
    document.getElementById('game-container').innerHTML = 
        '<h1 style="color:red;">Error: Phaser library not loaded. Check script tag in index.html.</h1>';
} else {
    console.log("Phaser found, version:", Phaser.VERSION);
    
    // Fix for "Multiple readback operations" warning
    if (window.HTMLCanvasElement) {
        // Apply the willReadFrequently attribute to Canvas prototype
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(type, attributes) {
            if (type === '2d') {
                attributes = attributes || {};
                attributes.willReadFrequently = true;
            }
            return originalGetContext.call(this, type, attributes);
        };
        console.log("Applied willReadFrequently=true to Canvas getContext");
    }
    
    // Wait for DOM to be ready
    window.addEventListener('load', () => {
        // Game configuration
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            backgroundColor: '#90EE90', // Light green fallback color
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false // Set to true for physics debugging
                }
            },
            scene: [
                BootScene,
                TitleScene,
                GameScene,
                GameOverScene
            ],
            audio: {
                disableWebAudio: false,
                noAudio: false
            },
            render: {
                transparent: false,
                pixelArt: false,
                antialias: true
            }
        };

        // Ensure SvgAssets class is available
        if (typeof SvgAssets === 'undefined') {
            console.error("SvgAssets class not found. Make sure SvgAssets.js is included before game.js");
            document.getElementById('game-container').innerHTML += 
                '<p style="color:red;">Error: SvgAssets class not loaded. Check script tags in index.html.</p>';
            return;
        }

        console.log("Starting game...");
        // Create the game instance
        const game = new Phaser.Game(config);
        
        // Add error handler
        game.canvas.addEventListener('webglcontextlost', (e) => {
            console.error('WebGL context lost. Trying to restore...');
            e.preventDefault();
            // Attempt to restore context
            setTimeout(() => {
                game.renderer.resetContext();
            }, 1);
        });
    });
}