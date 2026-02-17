import { gsap } from '../lib/gsap/index.js';
import { MotionPathPlugin } from '../lib/gsap/MotionPathPlugin.js';

gsap.registerPlugin(MotionPathPlugin);

export function initPathDemo(container) {
    container.innerHTML = `
    <h2>MotionPath Plugin</h2>
    <p>Animating along a curved path.</p>
    <div style="position: relative; height: 400px; width: 100%; border: 1px solid #333; overflow: hidden;">
      <svg id="motion-svg" width="100%" height="100%" viewBox="0 0 800 400">
        <path id="motion-path" fill="none" stroke="#333" stroke-width="2" d="M10,150 C150,50 300,250 450,150 S700,50 790,250" />
      </svg>
      <div id="mover" style="width: 50px; height: 30px; background: #88ce02; position: absolute; top:0; left:0; border-radius: 4px; z-index: 10;"></div>
    </div>
  `;

    const tween = gsap.to("#mover", {
        duration: 5,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
        ease: "power1.inOut",
        motionPath: {
            path: "#motion-path",
            align: "#motion-path",
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        }
    });

    return () => {
        tween.kill();
    };
}
