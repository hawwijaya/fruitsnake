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
            SNAKE_SPEED_FACTOR: 0.9, // Snake slightly slower than squirrel max speed
            WORM_SPEED_FACTOR: 0.7, // Worm even slower than snake
            SQUIRREL_SPEED: 200 // Squirrel movement speed
        };
        
        // Game state variables
        this.score = 0;
        this.applesRemaining = this.gameConstants.TOTAL_APPLES;
        this.isGameActive = true;
        
        // Snake state tracking - persist between apples
        this.snakeProperties = {
            segmentCount: 3, // Start with 3 segments
            moveSpeed: this.gameConstants.SQUIRREL_SPEED * this.gameConstants.SNAKE_SPEED_FACTOR,
            applesEaten: 0
        };
        
        // Add garden background with 70-degree view
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
        
        // Create the player-controlled squirrel
        const startX = this.cameras.main.width / 2;
        const startY = this.cameras.main.height / 2;
        this.squirrel = new Squirrel(this, startX, startY);
        
        // Spawn the first apple
        this.time.delayedCall(1000, this.spawnNewApple, [], this);
    }
    
    createGardenBackground() {
        const { width, height } = this.cameras.main;
        
        // Create a garden-like background with grass from 70-degree view
        const background = this.add.graphics();
        
        // Sky gradient (light blue to lighter blue) - smaller in 70-degree view
        background.fillGradientStyle(0x70B8FF, 0x70B8FF, 0xC0E0FF, 0xC0E0FF, 1);
        background.fillRect(0, 0, width, height * 0.3);
        
        // Grass gradient (dark green to light green)
        background.fillGradientStyle(0x458B00, 0x458B00, 0x66BB66, 0x66BB66, 1);
        background.fillRect(0, height * 0.3, width, height * 0.7);
        
        // Add some texture to the grass
        for (let i = 0; i < 300; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(height * 0.3, height);
            const size = Phaser.Math.Between(2, 4);
            
            // Draw small grass tufts
            background.fillStyle(0x44CC44, 0.6);
            background.fillCircle(x, y, size);
        }
        
        // Add a few clouds in the sky portion
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(width * 0.1, width * 0.9);
            const y = Phaser.Math.Between(height * 0.05, height * 0.2);
            const size = Phaser.Math.Between(30, 60);
            
            // Draw cloud puffs
            background.fillStyle(0xFFFFFF, 0.7);
            background.fillEllipse(x, y, size * 1.5, size * 0.7);
            background.fillEllipse(x + size * 0.7, y, size * 1.2, size * 0.6);
            background.fillEllipse(x - size * 0.7, y, size * 1.2, size * 0.6);
        }
        
        // Generate a texture from the graphics
        background.generateTexture('background', width, height);
        
        // Apply the texture as background image
        this.add.image(0, 0, 'background').setOrigin(0);
        
        // Clean up the graphics object
        background.destroy();
        console.log("Created garden background scene with 70-degree view");
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
        
        // Set appropriate body size for the basket
        this.basket.body.setSize(60, 50);
        this.basket.body.setOffset(10, 15);
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
        
        // Activate the apple for interaction
        this.apple.activate();
        
        // Play apple drop sound
        this.sound.play('drop', { volume: 0.5 });
        
        // Set up collision with squirrel
        this.physics.add.overlap(
            this.apple,
            this.squirrel,
            this.applePickup,
            null,
            this
        );
        
        // Spawn predators after a short delay
        this.time.delayedCall(2000, this.spawnPredators, [], this);
    }
    
    spawnPredators() {
        if (!this.apple || !this.apple.active || !this.isGameActive) return;
        
        // Calculate positions off-screen to spawn the snake and worm
        const { width, height } = this.cameras.main;
        let snakeX, snakeY, wormX, wormY;
        
        // Randomly choose sides to spawn predators from
        const snakeSide = Phaser.Math.Between(0, 3); // 0: top, 1: right, 2: bottom, 3: left
        const wormSide = (snakeSide + 2) % 4; // Opposite side from snake
        
        // Position snake
        switch (snakeSide) {
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
        
        // Position worm
        switch (wormSide) {
            case 0: // Top
                wormX = Phaser.Math.Between(0, width);
                wormY = -30;
                break;
            case 1: // Right
                wormX = width + 30;
                wormY = Phaser.Math.Between(0, height);
                break;
            case 2: // Bottom
                wormX = Phaser.Math.Between(0, width);
                wormY = height + 30;
                break;
            case 3: // Left
                wormX = -30;
                wormY = Phaser.Math.Between(0, height);
                break;
        }
        
        // Create snake
        this.snake = new Snake(this, snakeX, snakeY);
        
        // Set snake speed and segment count from persisted properties
        this.snake.moveSpeed = this.snakeProperties.moveSpeed;
        this.snake.setSegmentCount(this.snakeProperties.segmentCount);
        
        // Create worm
        this.worm = new Worm(this, wormX, wormY);
        
        // Initially target the apple
        const target = this.apple;
        this.snake.setTarget(target);
        this.worm.setTarget(target);
        
        // Play predator sounds
        this.sound.play('snake', { volume: 0.3 });
        
        // Set up collision between predators and squirrel
        this.physics.add.overlap(
            this.squirrel,
            [this.snake, this.worm],
            this.predatorCatchSquirrel,
            null,
            this
        );
        
        // Set up collision between basket and squirrel
        this.physics.add.overlap(
            this.squirrel,
            this.basket,
            this.deliverApple,
            function(squirrel) { 
                // Only trigger if squirrel is carrying an apple
                return squirrel.hasApple;
            },
            this
        );
    }
    
    applePickup(apple, squirrel) {
        // Only if apple is active and squirrel is not already carrying one
        if (!apple.isActive || squirrel.hasApple) return;
        
        // Squirrel picks up the apple
        squirrel.pickupApple();
        apple.pickup(squirrel);
        
        // Play collect sound
        this.sound.play('collect', { volume: 0.6 });
        
        // Show pickup animation
        this.showPickupAnimation(apple.x, apple.y);
        
        // Change predator targets to chase the squirrel
        if (this.snake) {
            this.snake.setTarget(squirrel);
        }
        if (this.worm) {
            this.worm.setTarget(squirrel);
        }
    }
    
    deliverApple(squirrel, basket) {
        // Squirrel delivers apple to basket
        
        // Increase score
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
        
        // Play collect sound
        this.sound.play('collect', { volume: 0.8 });
        
        // Show delivery animation
        this.showDeliveryAnimation(basket.x, basket.y);
        
        // Squirrel drops the apple (it's delivered to basket)
        squirrel.dropApple();
        
        // Remove apple and predators
        this.cleanupCurrentRound();
        
        // Check if game should continue
        this.checkGameStatus();
    }
    
    predatorCatchSquirrel(squirrel, predator) {
        // Only care if squirrel has apple
        if (!squirrel.hasApple) return;
        
        // Determine which predator caught the squirrel
        let predatorType;
        if (predator === this.snake) {
            predatorType = 'snake';
            // Snake grows longer
            predator.growLonger();
            
            // Store snake properties for next round
            this.snakeProperties.segmentCount = predator.getSegmentCount();
            this.snakeProperties.moveSpeed = predator.moveSpeed;
            this.snakeProperties.applesEaten++;
        } else if (predator === this.worm) {
            predatorType = 'worm';
        }
        
        // Make the squirrel drop the apple
        squirrel.dropApple();
        if (this.apple) this.apple.drop();
        
        // Play eat sound
        this.sound.play('eat', { volume: 0.6 });
        
        // Show eat animation
        this.showPredatorCaughtAnimation(predator.x, predator.y, predatorType);
        
        // Remove apple and predators after a delay
        this.time.delayedCall(1500, () => {
            this.cleanupCurrentRound();
            
            // Check if game should continue
            this.checkGameStatus();
        });
    }
    
    showPickupAnimation(x, y) {
        try {
            // Create particle effect for apple pickup
            const particles = this.add.particles('apple');
            
            // Particle emitter for sparkles
            const emitter = particles.createEmitter({
                speed: 50,
                scale: { start: 0.1, end: 0 },
                blendMode: 'ADD',
                lifespan: 300
            });
            
            // Emit particles at pickup point
            emitter.explode(8, x, y);
            
            // Clean up particles after animation
            this.time.delayedCall(500, () => {
                particles.destroy();
            });
        } catch (e) {
            console.error('Error showing pickup animation:', e);
        }
    }
    
    showDeliveryAnimation(x, y) {
        try {
            // Create particle effect for apple delivery
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
            
            // Emit particles at delivery point
            emitter.explode(12, x, y);
            
            // Add score text that floats up
            const scorePopup = this.add.text(x, y, '+1', {
                fontSize: '24px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            // Animate the score text
            this.tweens.add({
                targets: scorePopup,
                y: y - 60,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    scorePopup.destroy();
                    particles.destroy();
                }
            });
        } catch (e) {
            console.error('Error showing delivery animation:', e);
            // Add simpler score popup that doesn't rely on particles
            const scorePopup = this.add.text(x, y, '+1', {
                fontSize: '24px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            this.tweens.add({
                targets: scorePopup,
                y: y - 60,
                alpha: 0,
                duration: 1000,
                onComplete: () => scorePopup.destroy()
            });
        }
    }
    
    showPredatorCaughtAnimation(x, y, predatorType) {
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
                speed: 80,
                scale: { start: 0.2, end: 0 },
                blendMode: 'NORMAL',
                tint: 0xFF0000,
                lifespan: 500
            });
            
            // Emit particles at eat point
            emitter.explode(10, x, y);
            
            // Add text indicating what happened
            const message = predatorType === 'snake' ? 'Snake stole apple!' : 'Worm stole apple!';
            const popup = this.add.text(x, y - 20, message, {
                fontSize: '18px',
                color: '#FF0000',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);
            
            // Animate the text
            this.tweens.add({
                targets: popup,
                y: y - 60,
                alpha: 0,
                duration: 1200,
                onComplete: () => {
                    popup.destroy();
                    particles.destroy();
                }
            });
        } catch (e) {
            console.error('Error showing predator caught animation:', e);
        }
    }
    
    cleanupCurrentRound() {
        // Destroy apple if it exists
        if (this.apple) {
            this.apple.destroy();
            this.apple = null;
        }
        
        // Destroy predators
        if (this.snake) {
            this.snake.destroy();
            this.snake = null;
        }
        
        if (this.worm) {
            this.worm.destroy();
            this.worm = null;
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
    
    update(time, delta) {
        // Handle squirrel movement using keyboard
        if (this.squirrel) {
            this.squirrel.handleInput(this.cursors);
            this.squirrel.update();
        }
        
        // Update apple if active
        if (this.apple && this.apple.isActive) {
            this.apple.update();
        }
        
        // Update predators
        if (this.snake) {
            this.snake.update(time);
        }
        
        if (this.worm) {
            this.worm.update(time);
        }
        
        // If squirrel has apple, update predator targets
        if (this.squirrel && this.squirrel.hasApple) {
            if (this.snake) {
                this.snake.setTarget(this.squirrel);
            }
            if (this.worm) {
                this.worm.setTarget(this.squirrel);
            }
        } else if (this.apple && this.apple.isActive) {
            // If apple is on ground, target it
            if (this.snake) {
                this.snake.setTarget(this.apple);
            }
            if (this.worm) {
                this.worm.setTarget(this.apple);
            }
        }
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.GameScene = GameScene;
}