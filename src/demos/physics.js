import { gsap } from '../lib/gsap/index.js';
import { Physics2DPlugin } from '../lib/gsap/Physics2DPlugin.js';

gsap.registerPlugin(Physics2DPlugin);

export function initPhysicsDemo(container) {
    container.innerHTML = `
    <h2>Physics2D Plugin</h2>
    <p>Realistic gravity and velocity.</p>
    <div style="position: relative; height: 500px; border: 1px solid #333; overflow: hidden; background: #000;" id="physics-box">
      <!-- Particles will be injected here -->
    </div>
    <button id="emit-msg" class="nav-btn" style="margin-top: 20px;">Emit Particles</button>
  `;

    const box = document.getElementById('physics-box');

    function emitParticles() {
        for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
            width: 10px; height: 10px; background: ${gsap.utils.random(["#ff0055", "#00ccff", "#88ce02"])};
            border-radius: 50%; position: absolute; bottom: 0; left: 50%;
        `;
            box.appendChild(dot);

            gsap.to(dot, {
                duration: 2.5,
                physics2D: {
                    velocity: "random(200, 600)",
                    angle: "random(250, 290)",
                    gravity: 500
                },
                opacity: 0,
                onComplete: () => {
                    if (dot.parentNode) dot.parentNode.removeChild(dot);
                }
            });
        }
    }

    document.getElementById('emit-msg').addEventListener('click', emitParticles);

    // Initial blast
    emitParticles();

    return () => {
        gsap.killTweensOf("#physics-box div");
    };
}
