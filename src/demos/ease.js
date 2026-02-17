import { gsap } from '../lib/gsap/index.js';
import { CustomEase } from '../lib/gsap/CustomEase.js';
import { CustomWiggle } from '../lib/gsap/CustomWiggle.js';
import { CustomBounce } from '../lib/gsap/CustomBounce.js';

gsap.registerPlugin(CustomEase, CustomWiggle, CustomBounce);

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
        // strength=0.7, squash=0.6, squashID="squash"
        CustomBounce.create("myBounce", { strength: 0.7, squash: 3, squashID: "mySquash" });

        gsap.to("#bounce-box", {
            y: -150,
            duration: 1,
            ease: "myBounce",
            delay: 0.2
        });

        gsap.to("#bounce-box", {
            scaleY: 0.5,
            scaleX: 1.3,
            duration: 1,
            ease: "mySquash",
            delay: 0.2
        });
    });

    return () => {
        gsap.killTweensOf(".box");
    };
}
