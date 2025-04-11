// Snake.js - An AI-controlled snake that chases the squirrel or fruit
class Snake extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'snake');
        
        this.scene = scene;
        
        // Snake properties
        this.segmentRadius = 10;
        this.moveSpeed = 130; // Base speed
        this.segmentCount = 3; // Start with 3 segments
        this.baseSpeed = 130; // Store base speed for calculations
        this.speedIncrease = 0.1; // Speed increase percentage per fruit stolen
        this.appleCount = 0; // Track how many fruits were eaten
        
        // Set origin point to center
        this.setOrigin(0.5);
        
        // Add to scene
        scene.add.existing(this);
        
        // Enable physics
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        
        // Set collision box slightly smaller than visual size
        this.body.setSize(48, 40);
        this.body.setOffset(8, 12);
        
        // Set display size
        this.setSize(64, 64);
        this.setDisplaySize(64, 64);
        
        // Target for snake to follow
        this.target = null;
        
        // Body segments storage (visual only, not for collision)
        this.bodySegments = [];
        
        // Create visual body segments
        this.createBodySegments();
        
        // Set depth to ensure proper rendering
        this.setDepth(9);
    }
    
    // Get current segment count
    getSegmentCount() {
        return this.segmentCount;
    }
    
    // Set the segment count (used when recreating the snake)
    setSegmentCount(count) {
        if (count < 3) count = 3; // Ensure minimum length
        this.segmentCount = count;
        
        // Recreate body segments
        this.createBodySegments();
        
        return this;
    }
    
    createBodySegments() {
        // Clean up any existing body segments
        this.bodySegments.forEach(segment => {
            if (segment && segment.destroy) {
                segment.destroy();
            }
        });
        this.bodySegments = [];
        
        // Create body segments (these are just visual, not physics objects)
        for (let i = 1; i < this.segmentCount; i++) {
            const segment = this.scene.add.sprite(
                this.x - (i * 20), 
                this.y, 
                'snake'
            );
            segment.setOrigin(0.5);
            segment.setDisplaySize(40, 32);
            segment.setDepth(this.depth - 1);
            segment.alpha = 0.9 - (i * 0.1); // Fade out trailing segments
            this.bodySegments.push(segment);
        }
    }
    
    setTarget(target) {
        this.target = target;
    }
    
    growLonger() {
        // Increase segment count
        this.appleCount++;
        this.segmentCount++;
        
        // Add a new body segment
        const lastIndex = this.bodySegments.length - 1;
        const lastSegment = this.bodySegments[lastIndex] || this;
        
        const segment = this.scene.add.sprite(
            lastSegment.x, 
            lastSegment.y, 
            'snake'
        );
        segment.setOrigin(0.5);
        segment.setDisplaySize(40, 32);
        segment.setDepth(this.depth - 1);
        segment.alpha = 0.9 - (this.bodySegments.length * 0.1);
        this.bodySegments.push(segment);
        
        // Make snake slightly faster with each fruit eaten
        const speedMultiplier = 1 + (this.speedIncrease * this.appleCount);
        this.moveSpeed = this.baseSpeed * speedMultiplier;
        
        console.log(`Snake stole a fruit! Length: ${this.segmentCount}, Speed: ${this.moveSpeed.toFixed(1)}`);
    }
    
    update(time) {
        if (!this.target || !this.target.active) return;
        
        // Store previous position for segment trailing
        const prevX = this.x;
        const prevY = this.y;
        
        // Calculate direction to target
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        
        // Normalize and apply speed
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            const speedFactor = this.moveSpeed / distance;
            const velocityX = dx * speedFactor;
            const velocityY = dy * speedFactor;
            
            // Set the snake's velocity
            this.body.setVelocity(velocityX, velocityY);
            
            // Rotate snake to face direction of movement
            this.rotation = Math.atan2(dy, dx);
        } else {
            // Slow down when very close
            this.body.setVelocity(0, 0);
        }
        
        // Add a slight random movement to make the snake's path less predictable
        if (Math.random() < 0.05) {
            const jitter = 15;
            this.body.velocity.x += Phaser.Math.Between(-jitter, jitter);
            this.body.velocity.y += Phaser.Math.Between(-jitter, jitter);
        }
        
        // Update body segments to follow the head with delay
        this.updateBodySegments(prevX, prevY);
    }
    
    updateBodySegments(headX, headY) {
        if (this.bodySegments.length === 0) return;
        
        // Each segment follows the one in front of it
        let prevX = headX;
        let prevY = headY;
        let prevRotation = this.rotation;
        
        this.bodySegments.forEach((segment, index) => {
            // Save current position
            const segX = segment.x;
            const segY = segment.y;
            const segRotation = segment.rotation;
            
            // Calculate how far this segment should be from the previous one
            const lag = 0.2 + (index * 0.05); // Increasing lag for segments further back
            const newX = segment.x + (prevX - segment.x) * lag;
            const newY = segment.y + (prevY - segment.y) * lag;
            
            // Move segment towards target position
            segment.x = newX;
            segment.y = newY;
            
            // Rotate segment to face direction of travel
            const dx = prevX - segment.x;
            const dy = prevY - segment.y;
            if (dx !== 0 || dy !== 0) {
                const targetRotation = Math.atan2(dy, dx);
                // Smooth rotation
                segment.rotation = Phaser.Math.Angle.RotateTo(
                    segment.rotation,
                    targetRotation,
                    0.2
                );
            }
            
            // Store this segment's original position for the next segment to follow
            prevX = segX;
            prevY = segY;
            prevRotation = segRotation;
        });
    }
    
    destroy() {
        // Clean up all body segments when destroying the snake
        this.bodySegments.forEach(segment => {
            if (segment && segment.destroy) {
                segment.destroy();
            }
        });
        this.bodySegments = [];
        
        // Call parent destroy
        super.destroy();
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.Snake = Snake;
}