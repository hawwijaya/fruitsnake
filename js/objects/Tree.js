// Tree.js - Represents a tree that spawns apples
class Tree extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'tree');
        
        // Add to scene
        scene.add.existing(this);
        
        // Set size and display size
        this.setDisplaySize(180, 180);
        
        // Set origin to center
        this.setOrigin(0.5);
        
        // Set depth to render behind most game objects
        this.setDepth(1);
        
        // Add a small sway animation to make the tree feel alive
        scene.tweens.add({
            targets: this,
            angle: 1,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    // Get a random position to spawn an apple from
    getAppleSpawnPoint() {
        // In a top-down view, apples would fall from the canopy
        // We'll return a random point within the tree's canopy
        
        // Calculate a circular area representing the tree's canopy
        const radius = this.displayWidth * 0.3; // 30% of tree width
        
        // Generate random angle and distance within that circle
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius; // Random distance from center
        
        // Calculate position
        const x = this.x + Math.cos(angle) * distance;
        const y = this.y + Math.sin(angle) * distance;
        
        return { x, y };
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Tree = Tree;
}