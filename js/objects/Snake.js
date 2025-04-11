// Snake.js - Represents the AI-controlled snake that chases the apple
class Snake extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene;
        
        // Snake properties
        this.segmentRadius = 10;
        this.segmentSpacing = 5;
        this.moveSpeed = 150; // Will be adjusted based on game constants
        this.segments = [];
        this.segmentCount = 3; // Start with 3 segments
        this.bodyColor = 0x00AA00; // Green snake
        this.headColor = 0x008800; // Darker green for head
        this.baseSpeed = 150; // Store base speed for calculations
        this.speedIncrease = 0.1; // Speed increase percentage per apple eaten
        this.segmentsToAdd = 1; // How many segments to add per apple
        this.appleCount = 0; // Track how many apples were eaten
        
        // Trail effect properties
        this.lastPositions = [];
        this.trailUpdateFrequency = 3; // Update every 3 frames
        this.frameCounter = 0;
        
        // Create visual representation
        this.createSegments();
        
        // Add to scene
        scene.add.existing(this);
        
        // Add physics
        scene.physics.world.enable(this);
        this.body.setCircle(this.segmentRadius);
        this.body.setCollideWorldBounds(true);
        
        // Target for snake to follow
        this.target = null;
        
        // Set depth to ensure snake renders correctly
        this.setDepth(5);
    }
    
    // Get current segment count
    getSegmentCount() {
        return this.segmentCount;
    }
    
    // Set the segment count (used when recreating the snake)
    setSegmentCount(count) {
        if (count < 3) count = 3; // Ensure minimum length
        this.segmentCount = count;
        this.createSegments();
        
        // Adjust collision body based on length
        this.body.setCircle(this.segmentRadius * (1 + Math.min(this.segmentCount * 0.05, 0.5)));
        
        return this;
    }
    
    createSegments() {
        // Remove any existing segments
        this.segments.forEach(segment => segment.destroy());
        this.segments = [];
        
        // Create head segment
        const head = this.scene.add.circle(0, 0, this.segmentRadius, this.headColor);
        
        // Add eyes to head
        const leftEye = this.scene.add.circle(-this.segmentRadius/2, -this.segmentRadius/2, this.segmentRadius/4, 0xFFFFFF);
        const rightEye = this.scene.add.circle(this.segmentRadius/2, -this.segmentRadius/2, this.segmentRadius/4, 0xFFFFFF);
        
        // Create body segments
        for (let i = 1; i < this.segmentCount; i++) {
            const segment = this.scene.add.circle(
                -i * (this.segmentRadius * 2 + this.segmentSpacing), 
                0, 
                this.segmentRadius, 
                this.bodyColor
            );
            this.segments.push(segment);
        }
        
        // Add all segments to container
        this.add([head, leftEye, rightEye, ...this.segments]);
        
        // Set size based on total snake length
        const totalLength = this.segmentCount * (this.segmentRadius * 2 + this.segmentSpacing);
        this.setSize(totalLength, this.segmentRadius * 2);
    }
    
    setTarget(target) {
        this.target = target;
    }
    
    growLonger() {
        // Increase segment count more as the snake eats more apples
        this.appleCount++;
        this.segmentCount += this.segmentsToAdd;
        
        // Recreate segments with new count
        this.createSegments();
        
        // Make snake faster with each apple eaten
        // Uses a progressive formula: each apple makes the snake faster by an increasing percentage
        const speedMultiplier = 1 + (this.speedIncrease * this.appleCount);
        this.moveSpeed = this.baseSpeed * speedMultiplier;
        
        console.log(`Snake ate an apple! Length: ${this.segmentCount}, Speed: ${this.moveSpeed.toFixed(1)}`);
        
        // Adjust collision body
        this.body.setCircle(this.segmentRadius * (1 + Math.min(this.segmentCount * 0.05, 0.5)));
    }
    
    update() {
        if (!this.target || !this.target.active) return;
        
        // Calculate direction to target
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        
        // Normalize and apply speed
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) { // Reduced from 10 to make snake better at catching apple
            const speedFactor = this.moveSpeed / distance;
            const velocityX = dx * speedFactor;
            const velocityY = dy * speedFactor;
            
            // Set the snake's velocity
            this.body.setVelocity(velocityX, velocityY);
            
            // Rotate snake to face direction of movement
            this.rotation = Math.atan2(dy, dx);
        } else {
            // Stop when very close
            this.body.setVelocity(0, 0);
        }
        
        // Add a slight random movement to make the snake's path less predictable
        if (Math.random() < 0.1) {
            const jitter = 20; // Reduce from typical value of 50 to make movement less erratic
            this.body.velocity.x += Phaser.Math.Between(-jitter, jitter);
            this.body.velocity.y += Phaser.Math.Between(-jitter, jitter);
        }
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Snake = Snake;
}