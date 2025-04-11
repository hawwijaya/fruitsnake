// GameScene.js - Main gameplay scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Initialize game constants
        this.gameConstants = {
            TOTAL_APPLES: 10, // Total apples per game as per PRD
            MIN_DISTANCE_RATIO: 0.75, // Min distance between tree and basket (75% of screen)
            SNAKE_SPEED_FACTOR: 0.9, // Snake slightly slower than apple max speed
            APPLE_MOVE_SPEED: 200 // Apple movement speed
        };
        
        // Game state variables
        this.score = 0;
        this.applesRemaining = this.gameConstants.TOTAL_APPLES;
        this.isGameActive = true;
        
        // Snake state tracking - persist between apples
        this.snakeProperties = {
            segmentCount: 3, // Start with 3 segments
            moveSpeed: this.gameConstants.APPLE_MOVE_SPEED * this.gameConstants.SNAKE_SPEED_FACTOR,
            applesEaten: 0
        };
        
        // Add garden background - Check if background image exists, otherwise create one
        if (this.textures.exists('background')) {
            this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        } else {
            // Create a more detailed garden background if image is missing
            this.createGardenBackground();
        }
        
        // Place the tree and basket
        this.createTreeAndBasket();
        
        // Create input controls
        this.cursors = this.createInputControls();
        
        // Create UI elements
        this.createUI();
        
        // Start ambient garden sound if not already playing
        if (this.sound.get('ambient')) {
            if (!this.sound.get('ambient').isPlaying) {
                this.sound.play('ambient', { loop: true, volume: 0.3 });
                console.log("Playing ambient garden sounds");
            }
        } else {
            console.warn("Ambient sound not available");
        }
        
        // Spawn the first apple
        this.spawnNewApple();
    }
    
    createGardenBackground() {
        const { width, height } = this.cameras.main;
        
        // Create a garden-like background with grass and details
        const background = this.add.graphics();
        
        // Sky gradient (light blue to lighter blue)
        background.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xADD8E6, 0xADD8E6, 1);
        background.fillRect(0, 0, width, height * 0.6);
        
        // Grass gradient (dark green to light green)
        background.fillGradientStyle(0x458B00, 0x458B00, 0x66BB66, 0x66BB66, 1);
        background.fillRect(0, height * 0.6, width, height * 0.4);
        
        // Add some texture to the grass
        for (let i = 0; i < 200; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(height * 0.6, height);
            const size = Phaser.Math.Between(2, 5);
            
            // Draw small grass tufts
            background.fillStyle(0x44CC44, 1);
            background.fillRect(x, y - size, size, size * 2);
        }
        
        // Add a few clouds
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(width * 0.1, width * 0.9);
            const y = Phaser.Math.Between(height * 0.1, height * 0.3);
            const size = Phaser.Math.Between(30, 60);
            
            // Draw cloud puffs
            background.fillStyle(0xFFFFFF, 0.7);
            background.fillCircle(x, y, size);
            background.fillCircle(x + size * 0.7, y, size * 0.8);
            background.fillCircle(x - size * 0.7, y, size * 0.8);
        }
        
        // Generate a texture from the graphics
        background.generateTexture('background', width, height);
        
        // Apply the texture as background image
        this.add.image(0, 0, 'background').setOrigin(0);
        
        // Clean up the graphics object
        background.destroy();
        console.log("Created garden background scene as per PRD requirements");
    }
    
    createTreeAndBasket() {
        const { width, height } = this.cameras.main;
        
        // Calculate positions to ensure minimum distance
        let treeX, treeY, basketX, basketY;
        let meetingMinDistance = false;
        
        // Keep trying positions until they are far enough apart
        while (!meetingMinDistance) {
            // Position tree on the left side
            treeX = Phaser.Math.Between(100, width * 0.3);
            treeY = Phaser.Math.Between(100, height - 100);
            
            // Position basket on the right side
            basketX = Phaser.Math.Between(width * 0.7, width - 100);
            basketY = Phaser.Math.Between(100, height - 100);
            
            // Calculate distance
            const distance = Phaser.Math.Distance.Between(treeX, treeY, basketX, basketY);
            const minRequiredDistance = Math.max(width, height) * this.gameConstants.MIN_DISTANCE_RATIO;
            
            // Check if distance meets the minimum requirement
            if (distance >= minRequiredDistance) {
                meetingMinDistance = true;
            }
        }
        
        // Create tree and basket objects
        this.tree = new Tree(this, treeX, treeY);
        this.basket = new Basket(this, basketX, basketY);
        
        // Add physics static body to basket for collision detection
        this.physics.world.enable(this.basket);
        this.basket.body.setImmovable(true);
    }
    
    createInputControls() {
        // Create cursor keys for movement
        const cursors = this.input.keyboard.createCursorKeys();
        
        // Add WASD keys
        return {
            ...cursors,
            keyW: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            keyA: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            keyS: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            keyD: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
    }
    
    createUI() {
        // Create score text
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        // Create apples remaining counter
        this.applesText = this.add.text(20, 60, `Apples: ${this.applesRemaining}`, {
            fontSize: '24px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4
        });
        
        // Set high depth to ensure UI is always visible
        this.scoreText.setDepth(1000);
        this.applesText.setDepth(1000);
    }
    
    spawnNewApple() {
        if (this.applesRemaining <= 0 || !this.isGameActive) return;
        
        // Decrease apples remaining
        this.applesRemaining--;
        this.applesText.setText(`Apples: ${this.applesRemaining}`);
        
        // Get spawn point from tree
        const spawnPoint = this.tree.getAppleSpawnPoint();
        
        // Create new apple at the spawn point
        this.apple = new Apple(this, spawnPoint.x, spawnPoint.y);
        this.apple.moveSpeed = this.gameConstants.APPLE_MOVE_SPEED;
        
        // Add gravity to apple
        this.apple.body.setGravityY(100);
        
        // Activate the apple for control
        this.apple.activate();
        
        // Play apple drop sound
        this.sound.play('drop', { volume: 0.5 });
        
        // Set up collision with basket
        this.physics.add.overlap(
            this.apple, 
            this.basket,
            this.collectApple,
            null,
            this
        );
        
        // Spawn snake after a short delay
        this.time.delayedCall(500, this.spawnSnake, [], this);
    }
    
    spawnSnake() {
        if (!this.apple || !this.apple.active || !this.isGameActive) return;
        
        // Calculate a position off-screen to spawn the snake
        const { width, height } = this.cameras.main;
        let snakeX, snakeY;
        
        // Randomly choose a side to spawn from
        const side = Phaser.Math.Between(0, 3); // 0: top, 1: right, 2: bottom, 3: left
        
        switch (side) {
            case 0: // Top
                snakeX = Phaser.Math.Between(0, width);
                snakeY = -30;
                break;
            case 1: // Right
                snakeX = width + 30;
                snakeY = Phaser.Math.Between(0, height);
                break;
            case 2: // Bottom
                snakeX = Phaser.Math.Between(0, width);
                snakeY = height + 30;
                break;
            case 3: // Left
                snakeX = -30;
                snakeY = Phaser.Math.Between(0, height);
                break;
        }
        
        // Create snake
        this.snake = new Snake(this, snakeX, snakeY);
        
        // Set snake speed and segment count from persisted properties
        this.snake.moveSpeed = this.snakeProperties.moveSpeed;
        this.snake.setSegmentCount(this.snakeProperties.segmentCount);
        
        // Set snake target to apple
        this.snake.setTarget(this.apple);
        
        // Play snake sound
        this.sound.play('snake', { volume: 0.3 });
        
        // Add collision between snake and apple - fixed to use proper callback binding
        this.physics.add.overlap(
            this.snake,
            this.apple,
            this.snakeEatApple,
            null,
            this
        );
    }
    
    collectApple(apple, basket) {
        // Deactivate apple
        apple.deactivate();
        
        // Increase score
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
        
        // Play collect sound
        this.sound.play('collect', { volume: 0.6 });
        
        // Show collection animation
        this.showCollectionAnimation(apple.x, apple.y);
        
        // Remove apple and snake
        this.cleanupCurrentRound();
        
        // Check if game should continue
        this.checkGameStatus();
    }
    
    snakeEatApple(snake, apple) {
        // Make sure apple is active
        if (!apple.isActive) return;
        
        // Deactivate apple
        apple.deactivate();
        
        // Play eat sound
        this.sound.play('eat', { volume: 0.6 });
        
        // Snake grows longer
        snake.growLonger();
        
        // Persist snake's segment count and speed
        this.snakeProperties.segmentCount = snake.getSegmentCount();
        this.snakeProperties.moveSpeed = snake.moveSpeed;
        this.snakeProperties.applesEaten++;
        
        // Show eat animation
        this.showEatAnimation(apple.x, apple.y);
        
        // Remove apple and snake
        this.cleanupCurrentRound();
        
        // Check if game should continue
        this.checkGameStatus();
    }
    
    showCollectionAnimation(x, y) {
        try {
            // Create particle effect for apple collection
            let particles;
            
            // Check if we can use the apple texture or need a fallback
            if (this.textures.exists('apple')) {
                particles = this.add.particles('apple');
            } else {
                // Create a simple particle using a circle
                const particleKey = 'apple_particle';
                if (!this.textures.exists(particleKey)) {
                    const graphics = this.make.graphics();
                    graphics.fillStyle(0xFF0000, 1);
                    graphics.fillCircle(8, 8, 8);
                    graphics.generateTexture(particleKey, 16, 16);
                    graphics.destroy();
                }
                particles = this.add.particles(particleKey);
            }
            
            // Particle emitter for sparkles
            const emitter = particles.createEmitter({
                speed: 100,
                scale: { start: 0.2, end: 0 },
                blendMode: 'ADD',
                lifespan: 500
            });
            
            // Emit particles at collection point
            emitter.explode(10, x, y);
            
            // Add score text that floats up
            const scorePopup = this.add.text(x, y, '+1', {
                fontSize: '20px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            // Animate the score text
            this.tweens.add({
                targets: scorePopup,
                y: y - 50,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    scorePopup.destroy();
                    particles.destroy();
                }
            });
        } catch (e) {
            console.error('Error showing collection animation:', e);
            // Add simpler score popup that doesn't rely on particles
            const scorePopup = this.add.text(x, y, '+1', {
                fontSize: '20px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            this.tweens.add({
                targets: scorePopup,
                y: y - 50,
                alpha: 0,
                duration: 1000,
                onComplete: () => scorePopup.destroy()
            });
        }
    }
    
    showEatAnimation(x, y) {
        try {
            // Similar approach with error handling
            let particles;
            
            // Check if we can use the apple texture or need a fallback
            if (this.textures.exists('apple')) {
                particles = this.add.particles('apple');
            } else {
                // Create a simple particle
                const particleKey = 'apple_particle';
                if (!this.textures.exists(particleKey)) {
                    const graphics = this.make.graphics();
                    graphics.fillStyle(0xFF0000, 1);
                    graphics.fillCircle(8, 8, 8);
                    graphics.generateTexture(particleKey, 16, 16);
                    graphics.destroy();
                }
                particles = this.add.particles(particleKey);
            }
            
            // Particle emitter for apple bits
            const emitter = particles.createEmitter({
                speed: 50,
                scale: { start: 0.2, end: 0 },
                blendMode: 'NORMAL',
                tint: 0xFF0000,
                lifespan: 300
            });
            
            // Emit particles at eat point
            emitter.explode(8, x, y);
            
            // Clean up particles after animation
            this.time.delayedCall(500, () => {
                particles.destroy();
            });
        } catch (e) {
            console.error('Error showing eat animation:', e);
            // No fallback animation necessary for eat effect
        }
    }
    
    cleanupCurrentRound() {
        // Destroy apple and snake
        if (this.apple) {
            this.apple.destroy();
            this.apple = null;
        }
        
        if (this.snake) {
            this.snake.destroy();
            this.snake = null;
        }
        
        // Wait a brief moment before spawning a new apple
        this.time.delayedCall(1000, this.spawnNewApple, [], this);
    }
    
    checkGameStatus() {
        // Check if we've used all apples
        if (this.applesRemaining <= 0 && !this.apple) {
            // Play game over sound
            this.sound.play('gameover', { volume: 0.6 });
            
            // End the game after a delay
            this.time.delayedCall(1500, () => {
                this.isGameActive = false;
                this.scene.start('GameOverScene', { score: this.score });
            });
        }
    }
    
    update() {
        // Handle apple movement using keyboard
        if (this.apple && this.apple.isActive) {
            this.apple.handleInput(this.cursors);
        }
        
        // Update snake movement
        if (this.snake) {
            this.snake.update();
        }
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.GameScene = GameScene;
}