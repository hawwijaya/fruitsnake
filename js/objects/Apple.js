// Apple.js - Represents the player-controlled apple
class Apple extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'apple');
        
        this.scene = scene;
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics body
        this.body.setCircle(15); // Assuming apple radius of 15px
        this.body.setBounce(0.3);
        this.body.setCollideWorldBounds(true);
        this.body.setDrag(50, 50);
        
        // Initialize variables
        this.moveSpeed = 200; // Will be defined by game constants later
        this.isActive = false;
        
        // Create visual if texture is not available
        if (!scene.textures.exists('apple')) {
            this.createVisual();
        }
        
        // Set depth to ensure apple renders above other game objects
        this.setDepth(10);
    }
    
    createVisual() {
        // Create a graphic for the apple
        const graphics = this.scene.make.graphics();
        
        // Draw the apple (red circle)
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(16, 16, 15);
        
        // Add a little highlight
        graphics.fillStyle(0xFFFFFF, 0.5);
        graphics.fillCircle(10, 10, 5);
        
        // Add stem on top
        graphics.fillStyle(0x654321, 1);
        graphics.fillRect(16, 1, 3, 7);
        
        // Create a texture from the graphics
        graphics.generateTexture('apple', 32, 32);
        graphics.destroy();
        
        // Apply the texture to this sprite
        this.setTexture('apple');
    }
    
    activate() {
        this.isActive = true;
        this.body.setAllowGravity(true);
    }
    
    deactivate() {
        this.isActive = false;
        this.body.setVelocity(0, 0);
        this.body.setAllowGravity(false);
    }
    
    handleInput(cursors) {
        if (!this.isActive) return;
        
        // Reset acceleration
        let xAccel = 0;
        let yAccel = 0;
        
        // Check for keyboard input
        if (cursors.left.isDown || cursors.keyA.isDown) {
            xAccel = -this.moveSpeed;
        } else if (cursors.right.isDown || cursors.keyD.isDown) {
            xAccel = this.moveSpeed;
        }
        
        if (cursors.up.isDown || cursors.keyW.isDown) {
            yAccel = -this.moveSpeed * 0.7; // Less vertical control for game balance
        } else if (cursors.down.isDown || cursors.keyS.isDown) {
            yAccel = this.moveSpeed * 0.7;
        }
        
        // Apply acceleration
        this.body.setAcceleration(xAccel, yAccel);
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Apple = Apple;
}