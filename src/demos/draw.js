import { gsap } from '../lib/gsap/index.js';
import { DrawSVGPlugin } from '../lib/gsap/DrawSVGPlugin.js';

gsap.registerPlugin(DrawSVGPlugin);

export function initDrawDemo(container) {
    container.innerHTML = `
    <h2>DrawSVG Plugin</h2>
    <p>Self-drawing SVG strokes.</p>
    <svg version="1.1" id="draw-svg" xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" style="margin: 0 auto; display: block;">
      <path id="path" fill="none" stroke="#88ce02" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M10,10 C50,100 150,200 200,100 S350,0 390,100"/>
      <rect id="rect" x="50" y="150" width="100" height="100" fill="none" stroke="#00ccff" stroke-width="5"/>
      <circle id="circle-draw" cx="300" cy="200" r="50" fill="none" stroke="#ff0055" stroke-width="5"/>
    </svg>
    <button id="replay-draw" class="nav-btn">Replay</button>
  `;

    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power2.inOut" } });

    tl.fromTo("#path", { drawSVG: "0%" }, { drawSVG: "100%" })
        .fromTo("#rect", { drawSVG: "0%" }, { drawSVG: "100%" }, "-=0.5")
        .fromTo("#circle-draw", { drawSVG: "50% 50%" }, { drawSVG: "100%" }, "-=0.5");

    document.getElementById('replay-draw').addEventListener('click', () => {
        tl.restart();
    });

    return () => {
        tl.kill();
    };
}
