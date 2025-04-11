// SvgAssets.js - Creates SVG-based assets for the game
class SvgAssets {
    // Initialize all game assets
    static init(scene) {
        // Create SVG assets for the game
        this.createAppleTexture(scene);
        this.createTreeTexture(scene);
        this.createSnakeTexture(scene);
        this.createBasketTexture(scene);
        this.createSquirrelTexture(scene);
        this.createWormTexture(scene);
        
        // Generate procedural sounds
        this.createSoundAssets(scene);
    }
    
    // Create an apple texture using SVG
    static createAppleTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('apple')) return;
        
        // Apple SVG data - redesigned for top-down perspective
        const svgWidth = 48;
        const svgHeight = 48;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <!-- Apple body from top view -->
            <ellipse cx="24" cy="24" rx="20" ry="16" fill="#D10000" />
            
            <!-- Apple shadow to show depth -->
            <ellipse cx="24" cy="28" rx="16" ry="10" fill="rgba(0,0,0,0.2)" />
            
            <!-- Apple stem from top view -->
            <circle cx="24" cy="14" r="2" fill="#5D2906" />
            
            <!-- Apple leaf from top view -->
            <path d="M30 12 Q32 8 28 8 Q24 10 30 12" fill="#159300" />
            
            <!-- Apple highlight -->
            <ellipse cx="18" cy="18" rx="6" ry="4" fill="rgba(255,255,255,0.2)" transform="rotate(-15 18 18)" />
        </svg>`;
        
        this.svgToTexture(scene, 'apple', svg, svgWidth, svgHeight);
        console.log("Created apple SVG texture for top-down view");
    }
    
    // Create a tree texture using SVG (top-down perspective)
    static createTreeTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('tree')) return;
        
        const svgWidth = 180;
        const svgHeight = 180;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <!-- Tree shadow -->
            <ellipse cx="90" cy="90" rx="80" ry="70" fill="rgba(0,0,0,0.15)" />
            
            <!-- Tree trunk - visible as round center -->
            <circle cx="90" cy="90" r="20" fill="#8B4513" />
            
            <!-- Tree foliage from top view - layered circles -->
            <circle cx="90" cy="90" r="70" fill="#228B22" />
            <circle cx="65" cy="65" r="25" fill="#2EA12E" />
            <circle cx="115" cy="65" r="20" fill="#2EA12E" />
            <circle cx="65" cy="115" r="20" fill="#2EA12E" />
            <circle cx="115" cy="115" r="23" fill="#2EA12E" />
            <circle cx="90" cy="60" r="20" fill="#2EA12E" />
            <circle cx="90" cy="120" r="20" fill="#2EA12E" />
            <circle cx="50" cy="90" r="15" fill="#2EA12E" />
            <circle cx="130" cy="90" r="18" fill="#2EA12E" />
            
            <!-- Tree texture detail -->
            <circle cx="78" cy="75" r="8" fill="#196619" />
            <circle cx="105" cy="82" r="10" fill="#196619" />
            <circle cx="92" cy="110" r="12" fill="#196619" />
            <circle cx="70" cy="95" r="7" fill="#196619" />
            <circle cx="115" cy="100" r="9" fill="#196619" />
        </svg>`;
        
        this.svgToTexture(scene, 'tree', svg, svgWidth, svgHeight);
        console.log("Created tree SVG texture for top-down view");
    }
    
    // Create a basket texture using SVG (top-down perspective)
    static createBasketTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('basket')) return;
        
        const svgWidth = 80;
        const svgHeight = 80;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <!-- Basket shadow -->
            <ellipse cx="40" cy="45" rx="35" ry="25" fill="rgba(0,0,0,0.15)" />
            
            <!-- Basket from top view - oval shape -->
            <ellipse cx="40" cy="40" rx="30" ry="25" fill="#D2B48C" />
            
            <!-- Inner basket area -->
            <ellipse cx="40" cy="40" rx="22" ry="18" fill="#E8DCCA" />
            
            <!-- Basket weave texture - concentric ellipses -->
            <ellipse cx="40" cy="40" rx="30" ry="25" fill="none" stroke="#8B4513" stroke-width="1.5" />
            <ellipse cx="40" cy="40" rx="26" ry="21" fill="none" stroke="#8B4513" stroke-width="1" />
            <ellipse cx="40" cy="40" rx="22" ry="18" fill="none" stroke="#8B4513" stroke-width="1" />
            
            <!-- Cross-weave pattern -->
            <line x1="10" y1="40" x2="70" y2="40" stroke="#8B4513" stroke-width="1" />
            <line x1="40" y1="15" x2="40" y2="65" stroke="#8B4513" stroke-width="1" />
            <line x1="20" y1="25" x2="60" y2="55" stroke="#8B4513" stroke-width="1" />
            <line x1="20" y1="55" x2="60" y2="25" stroke="#8B4513" stroke-width="1" />
        </svg>`;
        
        this.svgToTexture(scene, 'basket', svg, svgWidth, svgHeight);
        console.log("Created basket SVG texture for top-down view");
    }
    
    // Create a snake texture using SVG (top-down perspective)
    static createSnakeTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('snake')) return;
        
        const svgWidth = 64;
        const svgHeight = 64;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Snake head viewed from above -->
            <ellipse cx="48" cy="32" rx="12" ry="10" fill="#008800" />
            
            <!-- Snake shadow -->
            <ellipse cx="46" cy="38" rx="10" ry="6" fill="rgba(0,0,0,0.15)" />
            
            <!-- Eyes from above - white with black pupils -->
            <circle cx="52" cy="28" r="3" fill="white" />
            <circle cx="52" cy="36" r="3" fill="white" />
            <circle cx="52" cy="28" r="1.5" fill="black" />
            <circle cx="52" cy="36" r="1.5" fill="black" />
            
            <!-- Forked tongue seen from above -->
            <path d="M60 32 L64 29 M60 32 L64 35" stroke="#FF0066" stroke-width="2" />
            
            <!-- Snake body segments, viewed from above with dimension -->
            <ellipse cx="30" cy="32" rx="10" ry="8" fill="#00AA00" />
            <ellipse cx="14" cy="32" rx="10" ry="8" fill="#00AA00" />
            
            <!-- Scales pattern -->
            <path d="M18 28 L22 27 L26 28 M34 28 L38 27 L42 28" stroke="#006600" stroke-width="1" fill="none" />
            <path d="M18 36 L22 37 L26 36 M34 36 L38 37 L42 36" stroke="#006600" stroke-width="1" fill="none" />
        </svg>`;
        
        this.svgToTexture(scene, 'snake', svg, svgWidth, svgHeight);
        console.log("Created snake SVG texture for top-down view");
    }
    
    // Create a squirrel texture using SVG (top-down perspective)
    static createSquirrelTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('squirrel')) return;
        
        const svgWidth = 48;
        const svgHeight = 64;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Squirrel body from top view -->
            <ellipse cx="24" cy="32" rx="12" ry="16" fill="#8B4513" />
            
            <!-- Shadow -->
            <ellipse cx="24" cy="37" rx="10" ry="8" fill="rgba(0,0,0,0.2)" />
            
            <!-- Squirrel head -->
            <circle cx="24" cy="18" r="8" fill="#A0522D" />
            
            <!-- Ears -->
            <circle cx="20" cy="12" r="4" fill="#8B4513" />
            <circle cx="28" cy="12" r="4" fill="#8B4513" />
            
            <!-- Eyes -->
            <circle cx="22" cy="16" r="1.5" fill="#000000" />
            <circle cx="26" cy="16" r="1.5" fill="#000000" />
            
            <!-- Nose -->
            <circle cx="24" cy="18" r="1" fill="#000000" />
            
            <!-- Tail from top view - curved shape -->
            <path d="M24 48 C 38 54, 44 42, 38 36" fill="#8B4513" stroke="#A0522D" stroke-width="1" />
            
            <!-- Tiny arms/paws from top view - small ovals -->
            <ellipse cx="18" cy="28" rx="3" ry="2" fill="#A0522D" />
            <ellipse cx="30" cy="28" rx="3" ry="2" fill="#A0522D" />
            
            <!-- Tiny legs/feet from top view - small ovals -->
            <ellipse cx="18" cy="42" rx="3" ry="2" fill="#A0522D" />
            <ellipse cx="30" cy="42" rx="3" ry="2" fill="#A0522D" />
        </svg>`;
        
        this.svgToTexture(scene, 'squirrel', svg, svgWidth, svgHeight);
        console.log("Created squirrel SVG texture for top-down view");
        
        // Create squirrel with apple texture
        const squirrelWithAppleSvg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Squirrel body from top view -->
            <ellipse cx="24" cy="32" rx="12" ry="16" fill="#8B4513" />
            
            <!-- Shadow -->
            <ellipse cx="24" cy="37" rx="10" ry="8" fill="rgba(0,0,0,0.2)" />
            
            <!-- Squirrel head -->
            <circle cx="24" cy="18" r="8" fill="#A0522D" />
            
            <!-- Ears -->
            <circle cx="20" cy="12" r="4" fill="#8B4513" />
            <circle cx="28" cy="12" r="4" fill="#8B4513" />
            
            <!-- Eyes -->
            <circle cx="22" cy="16" r="1.5" fill="#000000" />
            <circle cx="26" cy="16" r="1.5" fill="#000000" />
            
            <!-- Nose -->
            <circle cx="24" cy="18" r="1" fill="#000000" />
            
            <!-- Tail from top view - curved shape -->
            <path d="M24 48 C 38 54, 44 42, 38 36" fill="#8B4513" stroke="#A0522D" stroke-width="1" />
            
            <!-- Tiny arms/paws from top view - small ovals -->
            <ellipse cx="18" cy="28" rx="3" ry="2" fill="#A0522D" />
            <ellipse cx="30" cy="28" rx="3" ry="2" fill="#A0522D" />
            
            <!-- Tiny legs/feet from top view - small ovals -->
            <ellipse cx="18" cy="42" rx="3" ry="2" fill="#A0522D" />
            <ellipse cx="30" cy="42" rx="3" ry="2" fill="#A0522D" />
            
            <!-- Apple held in front of squirrel -->
            <ellipse cx="24" cy="25" rx="8" ry="7" fill="#D10000" />
            <circle cx="24" cy="21" r="1" fill="#5D2906" />
        </svg>`;
        
        this.svgToTexture(scene, 'squirrel_with_apple', squirrelWithAppleSvg, svgWidth, svgHeight);
        console.log("Created squirrel with apple SVG texture");
    }
    
    // Create a worm texture using SVG (top-down perspective)
    static createWormTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('worm')) return;
        
        const svgWidth = 40;
        const svgHeight = 24;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
            <!-- Worm body viewed from above - segmented -->
            <circle cx="20" cy="12" r="8" fill="#CC7766" />
            <circle cx="32" cy="12" r="7" fill="#DD9988" />
            <circle cx="8" cy="12" r="7" fill="#DD9988" />
            
            <!-- Worm shadow -->
            <ellipse cx="20" cy="16" rx="16" ry="4" fill="rgba(0,0,0,0.15)" />
            
            <!-- Worm face features -->
            <circle cx="34" cy="10" r="1" fill="#000000" />
            <circle cx="34" cy="14" r="1" fill="#000000" />
            
            <!-- Worm segments texture -->
            <line x1="13" y1="12" x2="27" y2="12" stroke="#BB6655" stroke-width="1" />
        </svg>`;
        
        this.svgToTexture(scene, 'worm', svg, svgWidth, svgHeight);
        console.log("Created worm SVG texture for top-down view");
    }
    
    // Create a background texture using SVG (70-degree angle top-down)
    static createBackgroundTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('background')) return;
        
        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;
        const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Sky color at 70-degree view -->
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#70B8FF" />
                    <stop offset="100%" stop-color="#C0E0FF" />
                </linearGradient>
                <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#66BB66" />
                    <stop offset="100%" stop-color="#458B00" />
                </linearGradient>
                <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(0.5)">
                    <path d="M0 0 L10 0 L8 10 L15 5 L12 15 L20 10 L18 20 L25 15 L23 25 L30 20 L28 30 L40 25 L40 40 L0 40 Z" fill="#529A00" />
                    <path d="M40 0 L30 0 L32 10 L25 5 L28 15 L20 10 L22 20 L15 15 L17 25 L10 20 L12 30 L0 25 L0 40 L40 40 Z" fill="#5AAB00" />
                </pattern>
            </defs>
            
            <!-- Sky from 70-degree view (less visible) -->
            <rect width="${width}" height="${height * 0.3}" fill="url(#skyGradient)" />
            
            <!-- Main grass area from top-down view -->
            <rect y="${height * 0.3}" width="${width}" height="${height * 0.7}" fill="url(#grassGradient)" />
            <rect y="${height * 0.3}" width="${width}" height="${height * 0.7}" fill="url(#grassPattern)" opacity="0.5" />
            
            <!-- Add scattered grass tufts visible from above -->
            ${Array.from({length: 200}, (_, i) => {
                const x = Math.random() * width;
                const y = height * 0.3 + Math.random() * (height * 0.7);
                const size = 2 + Math.random() * 4;
                return `<circle cx="${x}" cy="${y}" r="${size}" fill="#44AA44" opacity="${0.3 + Math.random() * 0.4}" />`;
            }).join('')}
            
            <!-- Add some small stones for texture -->
            ${Array.from({length: 30}, (_, i) => {
                const x = Math.random() * width;
                const y = height * 0.3 + Math.random() * (height * 0.7);
                const size = 3 + Math.random() * 5;
                return `<circle cx="${x}" cy="${y}" r="${size}" fill="#BBBBBB" opacity="${0.3 + Math.random() * 0.3}" />`;
            }).join('')}
            
            <!-- Add a few flowers -->
            ${Array.from({length: 15}, (_, i) => {
                const x = Math.random() * width;
                const y = height * 0.3 + Math.random() * (height * 0.7);
                const color = ['#FFFF00', '#FFFFFF', '#FF99FF'][Math.floor(Math.random() * 3)];
                return `
                <circle cx="${x}" cy="${y}" r="3" fill="${color}" />
                <circle cx="${x}" cy="${y}" r="1" fill="#FFCC00" />`;
            }).join('')}
        </svg>`;
        
        this.svgToTexture(scene, 'background', svg, width, height);
        console.log("Created background SVG texture for 70-degree top-down view");
    }
    
    // Helper method to convert SVG to a texture
    static svgToTexture(scene, key, svg, width, height) {
        try {
            // Create a data URL from the SVG
            const dataURL = 'data:image/svg+xml;base64,' + btoa(svg);
            
            // Load the texture from the data URL
            scene.textures.addBase64(key, dataURL);
            console.log(`Successfully created ${key} texture from SVG`);
        } catch (e) {
            console.error(`Error creating ${key} texture:`, e);
            
            // Create a fallback texture using graphics
            const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
            
            // Draw a simple placeholder based on the key
            switch (key) {
                case 'apple':
                    graphics.fillStyle(0xFF0000); // Red
                    graphics.fillCircle(width/2, height/2, width/3);
                    graphics.fillStyle(0x00AA00); // Green
                    graphics.fillRect(width/2 - 2, height/3 - 10, 4, 10);
                    break;
                    
                case 'tree':
                    // Trunk
                    graphics.fillStyle(0x8B4513); // Brown
                    graphics.fillRect(width/2 - 10, height/2, 20, height/2);
                    // Foliage
                    graphics.fillStyle(0x228B22); // Forest Green
                    graphics.fillCircle(width/2, height/3, width/3);
                    break;
                    
                case 'basket':
                    // Simple basket shape
                    graphics.fillStyle(0xD2B48C); // Tan
                    graphics.fillRect(0, height/3, width, height * 2/3);
                    graphics.strokeRect(0, height/3, width, height * 2/3);
                    break;
                    
                case 'snake':
                    // Snake head
                    graphics.fillStyle(0x008800);
                    graphics.fillCircle(width * 3/4, height/2, width/6);
                    // Snake body
                    graphics.fillStyle(0x00AA00);
                    graphics.fillCircle(width/2, height/2, width/7);
                    graphics.fillCircle(width/4, height/2, width/7);
                    break;
                    
                case 'background':
                    // Sky
                    graphics.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xADD8E6, 0xADD8E6, 1);
                    graphics.fillRect(0, 0, width, height * 0.7);
                    // Ground
                    graphics.fillGradientStyle(0x66BB66, 0x66BB66, 0x458B00, 0x458B00, 1);
                    graphics.fillRect(0, height * 0.7, width, height * 0.3);
                    break;
                    
                default:
                    // Default placeholder
                    graphics.fillStyle(0xCCCCCC);
                    graphics.fillRect(0, 0, width, height);
                    graphics.lineStyle(2, 0x000000);
                    graphics.strokeRect(4, 4, width-8, height-8);
                    break;
            }
            
            // Generate texture from the graphics
            graphics.generateTexture(key, width, height);
            graphics.destroy();
            console.log(`Created fallback ${key} texture using graphics`);
        }
    }
    
    // Create procedural sound assets
    static createSoundAssets(scene) {
        const audioContext = scene.sound.context;
        if (!audioContext) {
            console.warn("Audio context not available, cannot create procedural sounds");
            return;
        }
        
        try {
            // Create procedural sounds for each game event
            this.createDropSound(scene, audioContext);
            this.createCollectSound(scene, audioContext);
            this.createSnakeSound(scene, audioContext);
            this.createEatSound(scene, audioContext);
            this.createGameOverSound(scene, audioContext);
            this.createAmbientSound(scene, audioContext);
            
            console.log("Created all procedural sound effects");
        } catch (e) {
            console.error("Error creating procedural sounds:", e);
        }
    }
    
    // Create apple drop sound - a short falling tone
    static createDropSound(scene, audioContext) {
        const buffer = this.generateSoundBuffer(audioContext, 0.5, (t) => {
            // Falling tone
            const frequency = 800 - (t * 400);
            return Math.sin(frequency * t * Math.PI * 2) * (1 - t);
        });
        
        if (buffer) {
            scene.cache.audio.add('drop', buffer);
            console.log("Created drop sound effect");
        }
    }
    
    // Create apple collect sound - rising chime
    static createCollectSound(scene, audioContext) {
        const buffer = this.generateSoundBuffer(audioContext, 0.6, (t) => {
            // Rising cheerful sound
            const frequency = 400 + (t * 400);
            const amplitude = Math.min(1, t * 3) * (1 - t);
            return (
                Math.sin(frequency * t * Math.PI * 2) * amplitude + 
                Math.sin((frequency * 1.5) * t * Math.PI * 2) * amplitude * 0.5
            );
        });
        
        if (buffer) {
            scene.cache.audio.add('collect', buffer);
            console.log("Created collect sound effect");
        }
    }
    
    // Create snake movement sound - slithering effect
    static createSnakeSound(scene, audioContext) {
        const buffer = this.generateSoundBuffer(audioContext, 1.0, (t) => {
            // Slithering noise (filtered noise with modulation)
            const noise = Math.random() * 2 - 1;
            const envelope = Math.sin(t * Math.PI) * 0.8;
            const modulation = Math.sin(t * 20) * 0.5 + 0.5;
            return noise * envelope * modulation * 0.6;
        });
        
        if (buffer) {
            scene.cache.audio.add('snake', buffer);
            console.log("Created snake sound effect");
        }
    }
    
    // Create snake eat apple sound - crunching, slurping
    static createEatSound(scene, audioContext) {
        const buffer = this.generateSoundBuffer(audioContext, 0.7, (t) => {
            // Crunching followed by slurping
            let sound = 0;
            
            // First part: crunch (0-0.3)
            if (t < 0.3) {
                const normalizedT = t / 0.3;
                const noise = Math.random() * 2 - 1;
                const crunchEnvelope = Math.sin(normalizedT * Math.PI) * 0.6;
                sound += noise * crunchEnvelope;
            } 
            // Second part: slurp (0.3-0.7)
            else {
                const normalizedT = (t - 0.3) / 0.4;
                const slurpFreq = 300 - normalizedT * 200;
                const slurpEnvelope = (1 - normalizedT) * 0.8;
                sound += Math.sin(slurpFreq * normalizedT * Math.PI * 10) * slurpEnvelope;
                sound += (Math.random() * 2 - 1) * slurpEnvelope * 0.3;
            }
            
            return sound * 0.7;
        });
        
        if (buffer) {
            scene.cache.audio.add('eat', buffer);
            console.log("Created eat sound effect");
        }
    }
    
    // Create game over sound - descending failure tone
    static createGameOverSound(scene, audioContext) {
        const buffer = this.generateSoundBuffer(audioContext, 1.5, (t) => {
            // Descending "wah-wah-wah" failure sound
            const normalizedT = Math.min(1, t * 1.5);
            
            // Two descending frequencies
            const freq1 = 400 - (normalizedT * 200);
            const freq2 = 600 - (normalizedT * 300);
            
            const wobble = Math.sin(t * 15) * 0.5 + 0.5; // Wobble effect
            const envelope = (1 - Math.pow(normalizedT, 2)) * 0.8;
            
            return (
                (Math.sin(freq1 * t * Math.PI * 2) * 0.7 + 
                Math.sin(freq2 * t * Math.PI * 2) * 0.3) * 
                wobble * envelope
            );
        });
        
        if (buffer) {
            scene.cache.audio.add('gameover', buffer);
            console.log("Created game over sound effect");
        }
    }
    
    // Create ambient garden sound - birds, wind
    static createAmbientSound(scene, audioContext) {
        const duration = 6.0; // Longer loop
        const sampleRate = audioContext.sampleRate;
        const bufferSize = Math.floor(sampleRate * duration);
        const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Create a natural-sounding garden ambience
        for (let i = 0; i < bufferSize; i++) {
            const t = i / sampleRate;
            let sample = 0;
            
            // Gentle wind sounds (filtered noise)
            const wind = (Math.random() * 2 - 1) * 0.15;
            const windMod = 0.5 + Math.sin(t * 0.5) * 0.3 + Math.sin(t * 0.13) * 0.2;
            sample += wind * windMod * 0.3;
            
            // Occasional bird chirps
            const birdTiming1 = Math.sin(t * 0.79) * Math.sin(t * 1.32);
            const birdTiming2 = Math.sin(t * 0.5) * Math.sin(t * 0.92);
            const birdTiming3 = Math.sin(t * 1.23) * Math.sin(t * 0.39);
            
            if (birdTiming1 > 0.9) {
                const chirpTime = Math.max(0, Math.min(0.1, birdTiming1 - 0.9) * 10);
                const chirpFreq = 2000 + Math.sin(chirpTime * Math.PI * 10) * 500;
                const chirpEnv = Math.sin(chirpTime * Math.PI);
                sample += Math.sin(chirpFreq * t * Math.PI * 2) * chirpEnv * 0.2;
            }
            
            if (birdTiming2 > 0.85) {
                const chirpTime = Math.max(0, Math.min(0.2, birdTiming2 - 0.85) * 5);
                const chirpFreq = 1800 + Math.sin(chirpTime * Math.PI * 8) * 400;
                const chirpEnv = Math.sin(chirpTime * Math.PI);
                sample += Math.sin(chirpFreq * t * Math.PI * 2) * chirpEnv * 0.15;
            }
            
            if (birdTiming3 > 0.92) {
                const chirpTime = Math.max(0, Math.min(0.15, birdTiming3 - 0.92) * 6.67);
                const chirpFreq = 2200;
                const chirpEnv = Math.sin(chirpTime * Math.PI);
                sample += Math.sin(chirpFreq * t * Math.PI * 2) * chirpEnv * 0.1;
            }
            
            // Apply overall envelope so the loop is seamless
            let envelope = 1;
            if (t < 0.1) envelope = t * 10;
            else if (t > duration - 0.1) envelope = (duration - t) * 10;
            
            data[i] = sample * envelope * 0.7; // Final amplitude adjustment
        }
        
        scene.cache.audio.add('ambient', buffer);
        console.log("Created ambient garden sound effect");
    }
    
    // Helper method to generate a sound buffer from a sound function
    static generateSoundBuffer(audioContext, duration, soundFn) {
        try {
            const sampleRate = audioContext.sampleRate;
            const bufferSize = Math.floor(sampleRate * duration);
            const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                const t = i / sampleRate;
                data[i] = soundFn(t / duration);
            }
            
            return buffer;
        } catch (e) {
            console.error("Error generating sound buffer:", e);
            return null;
        }
    }
}

// Make the class available globally
if (typeof window !== 'undefined') {
    window.SvgAssets = SvgAssets;
}