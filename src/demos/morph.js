import { gsap } from '../lib/gsap/index.js';
import { MorphSVGPlugin } from '../lib/gsap/MorphSVGPlugin.js';

gsap.registerPlugin(MorphSVGPlugin);

export function initMorphDemo(container) {
    container.innerHTML = `
    <h2>MorphSVG</h2>
    <p>Shape shifting magic!</p>
    <svg id="morph-svg" width="300" height="300" viewBox="0 0 300 300" style="margin: 0 auto; display: block;">
      <path id="circle" fill="#88ce02" d="M150,150 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0" />
      <path id="star" style="visibility:hidden;" d="M150,15 192,100 285,114 217,180 233,273 150,230 67,273 83,180 15,114 108,100z" />
      <path id="hippo" style="visibility:hidden;" d="M54.6,71.1c16.3-8.8,32.7,2.2,42.5,14.6c1.6,2,3.1,4.2,4.6,6.4c5.8,8.5,12.3,16.4,20.8,22.2 c7.6,5.2,16.2,8.9,25.3,10.6c12.1,2.3,24.6,1.4,36.4-1.7c8.5-2.2,16.8-5.7,24.6-10.1c11.1-6.2,21.6-13.9,33.5-18.8 c5.5-2.3,11.3-4,17.2-5c12-2.1,25,1,34.8,8.6c8.1,6.3,13.6,15.3,15.5,25.4c1.6,8.2,1.2,16.7-0.7,24.8c-2.4,10.6-7.3,20.3-13.8,29.1 c-8.1,10.9-18.4,19.9-29.6,27.5c-15.6,10.6-32.9,18.7-51.2,23.6c-20.3,5.4-41.9,6.7-62.7,3.6c-11.2-1.7-22.1-4.9-32.4-9.9 c-10-4.9-19.1-11.5-26.6-20.1C48.6,192.3,46,178.6,46,164.6c0-11,2-21.6,5.6-31.9C57,117.2,65.3,103.8,76.5,93.4 c-4.4-7-11.8-12.2-17.7-18.2C56.6,73.5,55.1,76.3,54.6,71.1z" />
    </svg>
    <div style="margin-top: 20px;">
      <button class="nav-btn" id="to-star">To Star</button>
      <button class="nav-btn" id="to-circle">To Circle</button>
      <button class="nav-btn" id="to-hippo">To Blob</button>
    </div>
  `;

    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });

    document.getElementById('to-star').addEventListener('click', () => {
        gsap.to("#circle", { morphSVG: "#star", fill: "#ff00cc" });
    });

    document.getElementById('to-circle').addEventListener('click', () => {
        gsap.to("#circle", { morphSVG: "#circle", fill: "#88ce02" });
    });

    document.getElementById('to-hippo').addEventListener('click', () => {
        gsap.to("#circle", { morphSVG: "#hippo", fill: "#00ccff" });
    });

    return () => {
        gsap.killTweensOf("#circle");
    };
}
