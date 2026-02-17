import { gsap } from '../lib/gsap/index.js';
import { ScrollTrigger } from '../lib/gsap/ScrollTrigger.js';
import { ScrollSmoother } from '../lib/gsap/ScrollSmoother.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initSmootherDemo(container) {
  const style = document.createElement('style');
  style.textContent = `
    #demo-container {
      padding: 0 !important;
      max-width: none !important;
      height: 100vh;
      overflow: hidden; 
    }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div id="smooth-wrapper" style="overflow: hidden; width: 100%; height: 100%; position: absolute; top:0; left:0;">
      <div id="smooth-content" style="width: 100%;">
        <div class="section" style="height: 100vh; background: #111; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <h2>ScrollSmoother</h2>
          <p>Luxurious, silky smooth scrolling.</p>
          <div data-speed="0.5" style="background:#222; padding:20px; margin-top:50px; border-radius:10px;">I move slower (0.5)</div>
          <div data-speed="1.2" style="background:#333; padding:20px; margin-top:50px; margin-bottom: 150px; border-radius:10px;">I move faster (1.2)</div>
        </div>

        <div class="section" style="height: 100vh; background: #111; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <h2 data-speed="auto">Parallax Speed</h2>
          <div style="display:flex; gap: 20px;">
             <div data-speed="0.8" style="background: #ff0055; width: 100px; height: 100px; display:flex; align-items:center; justify-content:center;">0.8</div>
             <div data-speed="1.1" style="background: #00ccff; width: 100px; height: 100px; display:flex; align-items:center; justify-content:center;">1.1</div>
             <div data-speed="0.9" style="background: #88ce02; width: 100px; height: 100px; display:flex; align-items:center; justify-content:center;">0.9</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });

  return () => {
    smoother.kill();
    if (style.parentNode) style.parentNode.removeChild(style);
  };
}
