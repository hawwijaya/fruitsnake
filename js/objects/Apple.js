// Apple.js - Represents the fruit that drops from trees and can be collected
class Apple extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'apple');
        
        this.scene = scene;
        
        // Add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Set up physics body
        this.body.setCircle(15); // Assuming apple radius of 15px
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setDrag(90, 90);
        
        // Initialize variables
        this.isActive = false;
        this.isPickedUp = false;
        this.carrier = null; // Reference to object carrying this apple (squirrel)
        
        // Set size based on the texture
        this.setDisplaySize(32, 32);
        
        // Set origin to center
        this.setOrigin(0.5);
        
        // Add drop shadow
        this.createDropShadow();
        
        // Set depth to ensure apple renders at appropriate layer
        this.setDepth(15);
        
        // Add a simple bobbing animation to make it more visually interesting
        this.scene.tweens.add({
            targets: this,
            y: '+=4',
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    createDropShadow() {
        // Create shadow beneath the apple
        this.shadow = this.scene.add.ellipse(this.x, this.y + 12, 24, 12, 0x000000, 0.3);
        this.shadow.setDepth(5);
    }
    
    activate() {
        this.isActive = true;
        this.body.setAllowGravity(false); // No gravity in top-down view
        
        // Play a small drop animation
        this.scene.tweens.add({
            targets: this,
            y: this.y + 20,
            duration: 500,
            ease: 'Bounce.easeOut'
        });
    }
    
    deactivate() {
        this.isActive = false;
        this.body.setVelocity(0, 0);
    }
    
    pickup(carrier) {
        // Apple gets picked up by carrier (squirrel)
        this.isPickedUp = true;
        this.carrier = carrier;
        
        // Make apple follow carrier but become invisible (carrier will show apple)
        this.visible = false;
        if (this.shadow) this.shadow.visible = false;
        
        // Disable physics body while carried
        this.body.enable = false;
    }
    
    drop() {
        // Apple gets dropped
        this.isPickedUp = false;
        this.carrier = null;
        
        // Make apple visible again
        this.visible = true;
        if (this.shadow) this.shadow.visible = true;
        
        // Re-enable physics
        this.body.enable = true;
        
        // Add small velocity in random direction when dropped
        const angle = Math.random() * Math.PI * 2;
        const speed = 50 + Math.random() * 30;
        this.body.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed
        );
    }
    
    update() {
        // Update shadow position
        if (this.shadow) {
            this.shadow.x = this.x;
            this.shadow.y = this.y + 12;
        }
        
        // If picked up, follow the carrier
        if (this.isPickedUp && this.carrier) {
            this.x = this.carrier.x;
            this.y = this.carrier.y;
        }
        
        // Add a small rotation based on movement
        if (this.body.velocity.length() > 10) {
            // Rotate slightly based on movement direction
            const targetRotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
            this.rotation = Phaser.Math.Angle.RotateTo(
                this.rotation,
                targetRotation,
                0.1
            );
        }
    }
    
    destroy() {
        // Clean up shadow when apple is destroyed
        if (this.shadow) {
            this.shadow.destroy();
        }
        
        // Call parent destroy
        super.destroy();
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Apple = Apple;
}