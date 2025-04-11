// Tree.js - Represents the apple tree in the game
class Tree extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene;
        this.trunkWidth = 40;
        this.trunkHeight = 100;
        this.canopyRadius = 100;
        
        // Create visual representation
        this.createVisuals();
        
        // Add to scene
        scene.add.existing(this);
        
        // Add physics
        scene.physics.world.enable(this);
    }
    
    createVisuals() {
        // Create tree trunk (brown rectangle)
        const trunk = this.scene.add.rectangle(0, 0, this.trunkWidth, this.trunkHeight, 0x8B4513);
        
        // Create tree canopy (green circle)
        const canopy = this.scene.add.circle(0, -this.trunkHeight/2 - this.canopyRadius/2, this.canopyRadius, 0x228B22);
        
        // Add both parts to this container
        this.add([trunk, canopy]);
        
        // Set origin for positioning
        this.setSize(this.canopyRadius * 2, this.trunkHeight + this.canopyRadius * 2);
        
        // Store reference to the top of the trunk for apple spawning
        this.trunkTop = { 
            x: 0, 
            y: -this.trunkHeight/2 
        };
    }
    
    getAppleSpawnPoint() {
        // Return a position near the top of the trunk, with some random variation
        const variance = 30;
        return {
            x: this.x + this.trunkTop.x + Phaser.Math.Between(-variance, variance),
            y: this.y + this.trunkTop.y
        };
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Tree = Tree;
}