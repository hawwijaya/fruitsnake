// SvgAssets.js - Creates SVG-based assets for the game
class SvgAssets {
    // Initialize all game assets
    static init(scene) {
        // Create SVG assets for the game
        this.createAppleTexture(scene);
        this.createTreeTexture(scene);
        this.createSnakeTexture(scene);
        this.createBasketTexture(scene);
        
        // Generate procedural sounds
        this.createSoundAssets(scene);
    }
    
    // Create an apple texture using SVG
    static createAppleTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('apple')) return;
        
        // Apple SVG data
        const svgWidth = 64;
        const svgHeight = 64;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Apple stem -->
            <path d="M32 10 L32 18" stroke="brown" stroke-width="3" />
            <path d="M32 10 Q38 8 40 14" stroke="brown" stroke-width="2" fill="none"/>
            
            <!-- Apple body -->
            <path d="M24 20 Q20 14 28 14 Q36 14 40 20 Q54 28 42 48 Q32 60 22 48 Q10 28 24 20" fill="red" />
            
            <!-- Apple highlight -->
            <ellipse cx="28" cy="28" rx="5" ry="8" fill="rgba(255,255,255,0.3)" transform="rotate(-25 28 28)" />
            
            <!-- Apple leaf -->
            <path d="M32 14 Q38 4 42 12" stroke="none" fill="green" />
        </svg>`;
        
        this.svgToTexture(scene, 'apple', svg, svgWidth, svgHeight);
        console.log("Created apple SVG texture");
    }
    
    // Create a tree texture using SVG
    static createTreeTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('tree')) return;
        
        const svgWidth = 128;
        const svgHeight = 160;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 128 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Tree trunk -->
            <rect x="54" y="80" width="20" height="80" fill="#8B4513" />
            
            <!-- Tree foliage -->
            <circle cx="64" cy="80" r="40" fill="#228B22" />
            <circle cx="40" cy="60" r="25" fill="#228B22" />
            <circle cx="90" cy="65" r="30" fill="#228B22" />
            <circle cx="64" cy="40" r="25" fill="#228B22" />
            
            <!-- Apple positions -->
            <circle cx="45" cy="70" r="6" fill="red" />
            <circle cx="80" cy="50" r="6" fill="red" />
            <circle cx="90" cy="85" r="6" fill="red" />
            <circle cx="40" cy="40" r="6" fill="red" />
            <circle cx="64" cy="90" r="6" fill="red" />
        </svg>`;
        
        this.svgToTexture(scene, 'tree', svg, svgWidth, svgHeight);
        console.log("Created tree SVG texture");
    }
    
    // Create a basket texture using SVG
    static createBasketTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('basket')) return;
        
        const svgWidth = 80;
        const svgHeight = 60;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
            <!-- Basket rim -->
            <path d="M10 20 Q40 10 70 20" stroke="#8B4513" stroke-width="3" fill="none" />
            
            <!-- Basket body -->
            <path d="M10 20 L15 50 Q40 60 65 50 L70 20" fill="#D2B48C" />
            
            <!-- Basket weaving -->
            <path d="M10 25 L70 25" stroke="#8B4513" stroke-width="1.5" />
            <path d="M10 32 L70 32" stroke="#8B4513" stroke-width="1.5" />
            <path d="M10 39 L70 39" stroke="#8B4513" stroke-width="1.5" />
            <path d="M15 46 L65 46" stroke="#8B4513" stroke-width="1.5" />
            
            <!-- Vertical weaving -->
            <path d="M20 20 L22 50" stroke="#8B4513" stroke-width="1.5" />
            <path d="M30 16 L32 52" stroke="#8B4513" stroke-width="1.5" />
            <path d="M40 15 L40 55" stroke="#8B4513" stroke-width="1.5" />
            <path d="M50 16 L48 52" stroke="#8B4513" stroke-width="1.5" />
            <path d="M60 20 L58 50" stroke="#8B4513" stroke-width="1.5" />
        </svg>`;
        
        this.svgToTexture(scene, 'basket', svg, svgWidth, svgHeight);
        console.log("Created basket SVG texture");
    }
    
    // Create a snake texture using SVG
    static createSnakeTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('snake')) return;
        
        const svgWidth = 64;
        const svgHeight = 32;
        const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
            <!-- Snake head -->
            <circle cx="48" cy="16" r="12" fill="#008800" />
            
            <!-- Eyes -->
            <circle cx="52" cy="12" r="3" fill="white" />
            <circle cx="52" cy="20" r="3" fill="white" />
            <circle cx="52" cy="12" r="1.5" fill="black" />
            <circle cx="52" cy="20" r="1.5" fill="black" />
            
            <!-- Forked tongue -->
            <path d="M60 16 L64 12 M60 16 L64 20" stroke="#FF0066" stroke-width="2" />
            <rect x="56" y="15" width="4" height="2" fill="#FF0066" />
            
            <!-- Snake body -->
            <circle cx="30" cy="16" r="10" fill="#00AA00" />
            <circle cx="14" cy="16" r="10" fill="#00AA00" />
        </svg>`;
        
        this.svgToTexture(scene, 'snake', svg, svgWidth, svgHeight);
        console.log("Created snake SVG texture");
    }
    
    // Create a background texture using SVG
    static createBackgroundTexture(scene) {
        // Check if texture already exists
        if (scene.textures.exists('background')) return;
        
        const width = scene.cameras.main.width;
        const height = scene.cameras.main.height;
        const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Sky gradient -->
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="70%">
                    <stop offset="0%" stop-color="#87CEEB" />
                    <stop offset="100%" stop-color="#ADD8E6" />
                </linearGradient>
                <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#66BB66" />
                    <stop offset="100%" stop-color="#458B00" />
                </linearGradient>
            </defs>
            
            <!-- Sky -->
            <rect width="${width}" height="${height * 0.7}" fill="url(#skyGradient)" />
            
            <!-- Grass -->
            <rect y="${height * 0.7}" width="${width}" height="${height * 0.3}" fill="url(#grassGradient)" />
            
            <!-- Sun -->
            <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${width * 0.05}" fill="#FFD700" />
            <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${width * 0.08}" fill="rgba(255, 215, 0, 0.3)" />
            
            <!-- Clouds -->
            <g opacity="0.8" fill="white">
                <circle cx="${width * 0.2}" cy="${height * 0.25}" r="${width * 0.04}" />
                <circle cx="${width * 0.26}" cy="${height * 0.24}" r="${width * 0.05}" />
                <circle cx="${width * 0.17}" cy="${height * 0.24}" r="${width * 0.03}" />
                
                <circle cx="${width * 0.6}" cy="${height * 0.15}" r="${width * 0.04}" />
                <circle cx="${width * 0.65}" cy="${height * 0.14}" r="${width * 0.05}" />
                <circle cx="${width * 0.55}" cy="${height * 0.16}" r="${width * 0.04}" />
            </g>
        </svg>`;
        
        this.svgToTexture(scene, 'background', svg, width, height);
        console.log("Created background SVG texture");
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