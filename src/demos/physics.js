import { gsap } from '../lib/gsap/index.js';
import { Physics2DPlugin } from '../lib/gsap/Physics2DPlugin.js';

gsap.registerPlugin(Physics2DPlugin);

export function initPhysicsDemo(container) {
    container.innerHTML = `
    <h2>Physics2D Plugin</h2>
    <p>Realistic gravity and velocity.</p>
    <div style="position: relative; width: 100%; height: 600px; border: 1px solid #333; overflow: hidden; background: #000; z-index: 1; border-radius: 12px;" id="physics-box">
      <!-- Particles will be injected here -->
    </div>
  `;

    const box = document.getElementById('physics-box');

    // Automatic Emitter
    function emitParticle() {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 8px; height: 8px;
            background: ${gsap.utils.random(["#00FFFF", "#FF00FF", "#00FF00", "#FFFF00", "#FF0000"])};
            border-radius: 50%;
            position: absolute;
            bottom: 0px; 
            left: 50%; 
            transform: translateX(-50%);
            z-index: 10;
            box-shadow: 0 0 6px ${gsap.utils.random(["#00FFFF", "#FF00FF", "#00FF00", "#FFFF00"])};
            pointer-events: none;
        `;
        box.appendChild(dot);

        // Debug log to confirm creation
        // console.log("Emit");

        gsap.to(dot, {
            duration: "random(2, 4)",
            physics2D: {
                velocity: "random(400, 700)",
                angle: "random(250, 290)", // Upwards cone
                gravity: 400
            },
            delay: "random(0, 0.2)",
            onComplete: () => {
                if (dot.parentNode) dot.parentNode.removeChild(dot);
            }
        });
    }

    // Emit a new particle every 0.1 seconds
    const interval = setInterval(emitParticle, 50);

    return () => {
        clearInterval(interval);
        gsap.killTweensOf("#physics-box div");
    };
}
