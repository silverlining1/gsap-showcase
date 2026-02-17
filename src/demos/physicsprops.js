import { gsap } from '../lib/gsap/index.js';
import { PhysicsPropsPlugin } from '../lib/gsap/PhysicsPropsPlugin.js';

gsap.registerPlugin(PhysicsPropsPlugin);

export function initPropsDemo(container) {
    container.innerHTML = `
    <h2>PhysicsProps Plugin</h2>
    <p>Simulate friction and acceleration on any property.</p>
    <div style="width: 100%; height: 600px; border: 1px solid #333; position: relative; overflow: hidden; background: #111; border-radius: 12px;">
      <div id="prop-box" style="width: 80px; height: 80px; background: #ff0055; position: absolute; top: 50%; left: 10%; transform: translateY(-50%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 10;">
        Push
      </div>
    </div>
    <div style="margin-top: 20px;">
        <button id="friction-btn" class="nav-btn">Apply Friction</button>
        <button id="accel-btn" class="nav-btn">Apply Acceleration</button>
    </div>
  `;

    const box = document.getElementById('prop-box');

    document.getElementById('friction-btn').addEventListener('click', () => {
        // Reset
        gsap.set(box, { x: 0 });

        // Launch with velocity but slow down due to friction
        gsap.to(box, {
            duration: 2.5,
            physicsProps: {
                x: { velocity: 800, friction: 0.8 }
            }
        });
    });

    document.getElementById('accel-btn').addEventListener('click', () => {
        // Reset
        gsap.set(box, { x: 0 });

        // Accelerate indefinitely (simulating a thruster)
        gsap.to(box, {
            duration: 2.5,
            physicsProps: {
                x: { velocity: 100, acceleration: 200 }
            }
        });
    });

    return () => {
        gsap.killTweensOf(box);
    };
}
