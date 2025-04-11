// Squirrel.js - Player-controlled character that fetches fruits
class Squirrel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'squirrel');
        
        this.scene = scene;
        
        // Squirrel properties
        this.moveSpeed = 200; // Base movement speed
        this.maxSpeed = 300; // Maximum speed
        this.acceleration = 600; // How quickly squirrel accelerates
        this.deceleration = 800; // How quickly squirrel stops
        this.hasApple = false; // Whether squirrel is carrying an apple
        
        // Set origin to center
        this.setOrigin(0.5);
        
        // Add to scene
        scene.add.existing(this);
        
        // Enable physics
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        
        // Set collision circle
        this.body.setCircle(16, 8, 16);
        
        // Set size and display size
        this.setSize(32, 48);
        this.setDisplaySize(32, 48);
        
        // Set depth to render above most objects
        this.setDepth(10);
        
        // Create animations
        this.createAnimations();
    }
    
    createAnimations() {
        // Check if animations already exist
        if (this.scene.anims.exists('squirrel_idle')) return;
        
        // Create idle animation (simple back-and-forth bobbing)
        this.scene.anims.create({
            key: 'squirrel_idle',
            frames: [
                { key: 'squirrel', frame: 0 }
            ],
            frameRate: 10,
            repeat: -1
        });
        
        // Create carrying animation when squirrel has the apple
        this.scene.anims.create({
            key: 'squirrel_carrying',
            frames: [
                { key: 'squirrel_with_apple', frame: 0 }
            ],
            frameRate: 10,
            repeat: -1
        });
    }
    
    pickupApple() {
        // Set flag that squirrel has apple
        this.hasApple = true;
        
        // Change texture to squirrel carrying apple
        this.setTexture('squirrel_with_apple');
        
        // Make squirrel slightly slower when carrying apple
        this.moveSpeed = 180;
    }
    
    dropApple() {
        // Clear flag
        this.hasApple = false;
        
        // Change texture back to normal squirrel
        this.setTexture('squirrel');
        
        // Return to normal speed
        this.moveSpeed = 200;
    }
    
    handleInput(cursors) {
        // Calculate movement based on key input
        let moveX = 0;
        let moveY = 0;
        
        // Handle up/down movement
        if (cursors.up.isDown || cursors.keyW?.isDown) {
            moveY = -1;
        } else if (cursors.down.isDown || cursors.keyS?.isDown) {
            moveY = 1;
        }
        
        // Handle left/right movement
        if (cursors.left.isDown || cursors.keyA?.isDown) {
            moveX = -1;
            this.flipX = true; // Face left
        } else if (cursors.right.isDown || cursors.keyD?.isDown) {
            moveX = 1;
            this.flipX = false; // Face right
        }
        
        // Normalize for diagonal movement 
        if (moveX !== 0 && moveY !== 0) {
            const length = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX /= length;
            moveY /= length;
        }
        
        // Apply movement with acceleration physics
        if (moveX !== 0 || moveY !== 0) {
            // Apply acceleration in the direction of movement
            this.body.setAcceleration(
                moveX * this.acceleration,
                moveY * this.acceleration
            );
            
            // Cap maximum velocity
            const maxVel = this.moveSpeed;
            this.body.setMaxVelocity(maxVel, maxVel);
            
            // Play movement animation
            if (this.hasApple) {
                this.play('squirrel_carrying', true);
            } else {
                this.play('squirrel_idle', true);
            }
        } else {
            // No movement input, so decelerate
            this.body.setAcceleration(0, 0);
            
            // Apply drag to stop movement
            const dragFactor = 0.9;
            this.body.setVelocity(
                this.body.velocity.x * dragFactor,
                this.body.velocity.y * dragFactor
            );
            
            // If almost stopped, then stop completely
            if (Math.abs(this.body.velocity.x) < 10 && Math.abs(this.body.velocity.y) < 10) {
                this.body.setVelocity(0, 0);
            }
            
            // Play idle animation
            if (this.hasApple) {
                this.play('squirrel_carrying', true);
            } else {
                this.play('squirrel_idle', true);
            }
        }
    }
    
    update() {
        // Additional per-frame updates could go here
        
        // Apply rotation based on movement direction
        if (this.body.speed > 10) {
            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
            
            // Adjust rotation based on sprite orientation
            if (this.flipX) {
                this.rotation += Math.PI;
            }
        }
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Squirrel = Squirrel;
}