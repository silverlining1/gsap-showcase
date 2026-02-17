import { gsap } from '../lib/gsap/index.js';
import { CustomEase } from '../lib/gsap/CustomEase.js';
import { CustomWiggle } from '../lib/gsap/CustomWiggle.js';

gsap.registerPlugin(CustomEase, CustomWiggle);

export function initEaseDemo(container) {
    container.innerHTML = `
    <h2>CustomEase & Wiggle</h2>
    <p>Non-standard eases for organic feel.</p>
    <div style="display:flex; justify-content:center; gap:50px; margin-top:50px;">
        <div class="box" id="wiggle-box">Wiggle</div>
        <div class="box" id="bounce-box" style="background: #00ccff;">Squash</div>
    </div>
    <div style="margin-top: 50px;">
        <button id="do-wiggle" class="nav-btn">Wiggle</button>
        <button id="do-bounce" class="nav-btn">Bounce</button>
    </div>
  `;

    document.getElementById('do-wiggle').addEventListener('click', () => {
        // Determine wiggle type
        CustomWiggle.create("myWiggle", { type: "easeOut", wiggles: 10 });
        gsap.to("#wiggle-box", { rotation: 30, duration: 2, ease: "myWiggle" });
    });

    document.getElementById('do-bounce').addEventListener('click', () => {
        // Create a custom squash/stretch bounce
        gsap.to("#bounce-box", {
            y: -150,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
        // This is simple bounce, let's make a custom ease curve
        // Drawing a curve that goes way past 1 and settles back
        CustomEase.create("hop", "M0,0 C0,0 0.2,1 0.5,1 0.8,1 1,1 1,1"); // Simplified for demo without visualizer
    });

    return () => {
        gsap.killTweensOf(".box");
    };
}
