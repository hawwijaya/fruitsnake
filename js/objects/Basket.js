// Basket.js - Represents the basket that catches apples
class Basket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'basket');
        
        this.scene = scene;
        
        // Add to scene
        scene.add.existing(this);
        
        // Set display size
        this.setDisplaySize(80, 80);
        
        // Set depth to render at the correct layer
        this.setDepth(2);
        
        // Add physics
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        
        // Set appropriate body size
        this.body.setSize(60, 50);
        this.body.setOffset(10, 15);
        
        // Add a subtle animation to make the basket more visually interesting
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.03,
            scaleY: 1.03,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Basket = Basket;
}