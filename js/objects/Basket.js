// Basket.js - Represents the basket that catches apples
class Basket extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene;
        this.basketWidth = 80;
        this.basketHeight = 50;
        
        // Create visual representation
        this.createVisuals();
        
        // Add to scene
        scene.add.existing(this);
        
        // Add physics
        scene.physics.world.enable(this);
        
        // Set physics body size
        this.body.setSize(this.basketWidth, this.basketHeight/2);
        this.body.setOffset(-this.basketWidth/2, -this.basketHeight/2);
    }
    
    createVisuals() {
        // Create basket body (brown arc)
        const basketBody = this.scene.add.graphics();
        basketBody.fillStyle(0x8B4513, 1);
        basketBody.lineStyle(3, 0x654321, 1);
        
        // Draw a semi-circle for the basket
        basketBody.beginPath();
        basketBody.arc(0, 0, this.basketWidth/2, 0, Math.PI, false);
        basketBody.strokePath();
        basketBody.fillPath();
        
        // Add horizontal line at the top
        basketBody.beginPath();
        basketBody.moveTo(-this.basketWidth/2, 0);
        basketBody.lineTo(this.basketWidth/2, 0);
        basketBody.strokePath();
        
        // Add this to the container
        this.add(basketBody);
        
        // Set size for container
        this.setSize(this.basketWidth, this.basketHeight);
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Basket = Basket;
}