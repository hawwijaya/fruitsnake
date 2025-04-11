// TitleScene.js - The game's title screen
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        // Add background
        this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Add title text with nice styling
        const titleText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 3,
            'Fruit Worm',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '64px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 6,
                shadow: { color: '#000000', blur: 10, offsetX: 2, offsetY: 2, fill: true }
            }
        ).setOrigin(0.5);

        // Add subtitle
        this.add.text(
            this.cameras.main.width / 2,
            titleText.y + 80,
            'Help the apples reach the basket!',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);

        // Instructions
        this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 180,
            'Use arrow keys or WASD to control the falling apples.\nAvoid the hungry worm!',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 2,
                align: 'center'
            }
        ).setOrigin(0.5);

        // Create start button
        const startButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height - 100,
            'Start Game',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '32px',
                color: '#FFFFFF',
                backgroundColor: '#4CAF50',
                padding: { left: 20, right: 20, top: 10, bottom: 10 },
                stroke: '#000000',
                strokeThickness: 1
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Button states
        startButton.on('pointerover', () => {
            startButton.setStyle({ backgroundColor: '#66BB6A' });
        });

        startButton.on('pointerout', () => {
            startButton.setStyle({ backgroundColor: '#4CAF50' });
        });

        startButton.on('pointerdown', () => {
            startButton.setStyle({ backgroundColor: '#388E3C', padding: { left: 20, right: 20, top: 12, bottom: 8 } });
        });

        startButton.on('pointerup', () => {
            // Play click sound if available
            if (this.sound.get('collect')) {
                this.sound.play('collect', { volume: 0.5 });
            }

            // Start the game scene
            this.scene.start('GameScene');
        });

        // Play ambient sound if available (looped)
        if (this.sound.get('ambient')) {
            this.sound.play('ambient', { loop: true, volume: 0.3 });
        }

        // Add a decorative apple and snake to the title screen
        // Apple icon
        const apple = this.add.graphics();
        apple.fillStyle(0xFF0000, 1);
        apple.fillCircle(this.cameras.main.width / 2 - 150, titleText.y, 20);
        apple.fillStyle(0x654321, 1);
        apple.fillRect(this.cameras.main.width / 2 - 150, titleText.y - 25, 3, 10);
        
        // Snake icon
        const snake = this.add.graphics();
        snake.fillStyle(0x00AA00, 1);
        snake.fillCircle(this.cameras.main.width / 2 + 150, titleText.y, 15);
        snake.fillCircle(this.cameras.main.width / 2 + 180, titleText.y + 5, 12);
        snake.fillCircle(this.cameras.main.width / 2 + 205, titleText.y + 15, 10);
        snake.fillStyle(0xFFFFFF, 1);
        snake.fillCircle(this.cameras.main.width / 2 + 145, titleText.y - 5, 5);
        snake.fillCircle(this.cameras.main.width / 2 + 155, titleText.y - 5, 5);
        snake.fillStyle(0x000000, 1);
        snake.fillCircle(this.cameras.main.width / 2 + 145, titleText.y - 5, 2);
        snake.fillCircle(this.cameras.main.width / 2 + 155, titleText.y - 5, 2);
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.TitleScene = TitleScene;
}