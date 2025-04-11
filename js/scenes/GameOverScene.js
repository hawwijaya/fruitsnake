// GameOverScene.js - Displays the game over screen with final score
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        // Get final score from GameScene
        this.finalScore = data.score || 0;
    }

    create() {
        // Add background with darkened overlay
        const bg = this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        bg.setTint(0x555555); // Darken the background
        
        // Add overlay for better text contrast
        const overlay = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width * 0.6,
            this.cameras.main.height * 0.6,
            0x000000, 0.7
        );
        overlay.setOrigin(0.5);
        
        // Add Game Over text
        this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 3,
            'Game Over',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '64px',
                color: '#FF0000',
                stroke: '#000000',
                strokeThickness: 6,
                shadow: { color: '#000000', blur: 10, offsetX: 2, offsetY: 2, fill: true }
            }
        ).setOrigin(0.5);
        
        // Add score text
        this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            `Final Score: ${this.finalScore}`,
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '32px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(0.5);
        
        // Add some flavor text based on score
        let flavorText = '';
        if (this.finalScore === 0) {
            flavorText = 'Better luck next time!';
        } else if (this.finalScore < 3) {
            flavorText = 'Good effort!';
        } else if (this.finalScore < 7) {
            flavorText = 'Well done!';
        } else if (this.finalScore < 10) {
            flavorText = 'Excellent job!';
        } else {
            flavorText = 'Perfect score! Amazing!';
        }
        
        this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 + 50,
            flavorText,
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '24px',
                color: '#FFFF00',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);
        
        // Create Play Again button
        const playAgainButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height * 0.7,
            'Play Again',
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

        // Button hover states
        playAgainButton.on('pointerover', () => {
            playAgainButton.setStyle({ backgroundColor: '#66BB6A' });
        });

        playAgainButton.on('pointerout', () => {
            playAgainButton.setStyle({ backgroundColor: '#4CAF50' });
        });

        playAgainButton.on('pointerdown', () => {
            playAgainButton.setStyle({ backgroundColor: '#388E3C', padding: { left: 20, right: 20, top: 12, bottom: 8 } });
        });

        playAgainButton.on('pointerup', () => {
            // Play click sound
            if (this.sound.get('collect')) {
                this.sound.play('collect', { volume: 0.5 });
            }
            
            // Restart the game
            this.scene.start('GameScene');
        });
        
        // Add Main Menu button
        const mainMenuButton = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height * 0.7 + 70,
            'Main Menu',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: '28px',
                color: '#FFFFFF',
                backgroundColor: '#2196F3',
                padding: { left: 20, right: 20, top: 10, bottom: 10 },
                stroke: '#000000',
                strokeThickness: 1
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Button hover states for main menu
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setStyle({ backgroundColor: '#42A5F5' });
        });

        mainMenuButton.on('pointerout', () => {
            mainMenuButton.setStyle({ backgroundColor: '#2196F3' });
        });

        mainMenuButton.on('pointerdown', () => {
            mainMenuButton.setStyle({ backgroundColor: '#1976D2', padding: { left: 20, right: 20, top: 12, bottom: 8 } });
        });

        mainMenuButton.on('pointerup', () => {
            // Play click sound
            if (this.sound.get('collect')) {
                this.sound.play('collect', { volume: 0.5 });
            }
            
            // Return to title screen
            this.scene.start('TitleScene');
        });
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.GameOverScene = GameOverScene;
}