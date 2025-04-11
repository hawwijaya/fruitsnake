// Worm.js - An AI-controlled worm that chases the fruit or squirrel
class Worm extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'worm');
        
        this.scene = scene;
        
        // Worm properties
        this.moveSpeed = 100; // Base speed - slower than snake but has different movement pattern
        this.wiggleFrequency = 2; // How fast the worm wiggles
        this.wiggleAmplitude = 30; // How much the worm changes direction
        this.targetUpdateDelay = 500; // Time in ms between path recalculations
        this.lastTargetUpdate = 0; // Tracker for when we last updated pathing
        this.initialRotation = Math.random() * Math.PI * 2; // Random start rotation
        
        // Set origin point to center
        this.setOrigin(0.5);
        
        // Add to scene
        scene.add.existing(this);
        
        // Enable physics
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        
        // Set collision circle to be smaller than visual size for gameplay feel
        this.body.setCircle(8, 12, 4);
        
        // Set size and display size
        this.setSize(40, 24);
        this.setDisplaySize(40, 24);
        
        // Target to follow
        this.target = null;
        
        // Set depth to ensure proper rendering
        this.setDepth(8);
    }
    
    setTarget(target) {
        this.target = target;
    }
    
    update(time) {
        if (!this.target || !this.target.active) return;
        
        // Update movement path only periodically to create more organic movement
        // This makes the worm move in spurts rather than perfect targeting
        const shouldUpdateTarget = time - this.lastTargetUpdate > this.targetUpdateDelay;
        
        if (shouldUpdateTarget) {
            this.lastTargetUpdate = time;
            
            // Calculate direction to target
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
                // Normalize and apply speed
                let speedFactor = this.moveSpeed / distance;
                
                // Calculate a wiggle factor to make worm move more organically
                const wiggle = Math.sin(time * 0.01 * this.wiggleFrequency) * this.wiggleAmplitude;
                
                // Apply wiggle to direction by rotating the vector
                const angle = Math.atan2(dy, dx) + (wiggle * Math.PI / 180);
                const velocityX = Math.cos(angle) * this.moveSpeed;
                const velocityY = Math.sin(angle) * this.moveSpeed;
                
                // Set velocity with slight randomness
                this.body.setVelocity(
                    velocityX + (Math.random() * 20 - 10),
                    velocityY + (Math.random() * 20 - 10)
                );
                
                // Rotate sprite to face direction of travel
                this.rotation = angle;
            } else {
                // Stop when very close
                this.body.setVelocity(0, 0);
            }
        }
        
        // Create a subtle wiggling visual effect by rotating slightly
        this.rotation += Math.sin(time * 0.01) * 0.05;
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Worm = Worm;
}