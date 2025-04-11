// BootScene.js - Handles asset loading and initialization
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Display loading text
        const loadingText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Loading Game...',
            { fontSize: '32px', fill: '#FFF' }
        );
        loadingText.setOrigin(0.5);
        
        // Set up loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            this.cameras.main.width / 2 - 160,
            this.cameras.main.height / 2 + 30,
            320, 50
        );
        
        // Show loading progress
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(
                this.cameras.main.width / 2 - 150,
                this.cameras.main.height / 2 + 40,
                300 * value, 30
            );
        });
        
        // Clear progress bar when complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        
        // Set willReadFrequently attribute to true to fix Canvas2D warning
        if (this.sys.game.renderer.type === Phaser.CANVAS) {
            const canvas = this.sys.canvas;
            canvas.willReadFrequently = true;
            console.log("Set willReadFrequently to true on canvas");
        }
        
        // Try to load external assets first
        this.loadAssets();
    }

    loadAssets() {
        // Try to load image assets if they exist
        this.load.path = 'assets/';
        
        // Images - we'll try to load these but create them using SVG if they fail
        this.load.image('background', 'images/background.png').on('filecomplete', () => {
            console.log('Background loaded successfully');
        }).on('loaderror', () => {
            console.log('Background image not found, will use procedurally generated background');
        });
        
        // Load simple shape assets for fallbacks when images are missing
        this.load.image('tree', 'images/tree.png');
        this.load.image('apple', 'images/apple.png');
        this.load.image('snake', 'images/snake.png');
        this.load.image('basket', 'images/basket.png');
        
        // Sounds - we'll use procedural sounds if these fail
        const sounds = [
            { key: 'drop', file: 'sounds/apple_drop.mp3', desc: 'Apple dropping sound' },
            { key: 'collect', file: 'sounds/apple_collect.mp3', desc: 'Apple collection (basket) sound' },
            { key: 'snake', file: 'sounds/snake_move.mp3', desc: 'Snake movement sound' },
            { key: 'eat', file: 'sounds/snake_eat.mp3', desc: 'Snake eating apple sound' },
            { key: 'gameover', file: 'sounds/game_over.mp3', desc: 'Game over sound' },
            { key: 'ambient', file: 'sounds/ambient.mp3', desc: 'Background ambient garden sounds' }
        ];
        
        // Try to load each sound
        sounds.forEach(sound => {
            this.load.audio(sound.key, sound.file)
                .on('filecomplete', () => {
                    console.log(`${sound.key} sound loaded successfully - ${sound.desc}`);
                })
                .on('loaderror', () => {
                    console.warn(`${sound.key} sound not found (${sound.desc}), will use generated sound`);
                });
        });
    }

    create() {
        // Generate all SVG-based assets
        console.log("Creating SVG-based assets as fallbacks");
        SvgAssets.init(this);
        
        // Create the background texture if needed
        SvgAssets.createBackgroundTexture(this);
        
        // Transition to title scene
        this.scene.start('TitleScene');
    }
}

// Make sure class is available globally
if (typeof window !== 'undefined') {
    window.BootScene = BootScene;
}