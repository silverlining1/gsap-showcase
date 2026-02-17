import { gsap } from '../lib/gsap/index.js';
import { ScrollTrigger } from '../lib/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollDemo(container) {
    container.innerHTML = `
    <h2>ScrollTrigger Demo</h2>
    <p style="margin-bottom: 50px;">Scroll down to see magic!</p>
    
    <div class="scroll-section section-1" style="height: 100vh; background: #222; display: flex; align-items: center; justify-content: center;">
      <div class="box scroll-box">Spin</div>
    </div>
    
    <div class="scroll-section section-2" style="height: 100vh; background: #333; display: flex; align-items: center; justify-content: center;">
      <div class="box scroll-box-2">Grow</div>
    </div>

    <div class="scroll-section section-3" style="height: 100vh; background: #111; display: flex; align-items: center; justify-content: center;">
      <h2 class="scroll-text">Finish</h2>
    </div>
  `;

    const ctx = gsap.context(() => {
        // Box 1 spins as you scroll
        gsap.to('.scroll-box', {
            scrollTrigger: {
                trigger: '.section-1',
                start: 'center center',
                end: 'bottom top',
                scrub: true,
                markers: true
            },
            rotation: 360,
            borderRadius: '50%'
        });

        // Box 2 grows and pins
        gsap.from('.scroll-box-2', {
            scrollTrigger: {
                trigger: '.section-2',
                start: 'center center',
                end: '+=500', // pin for 500px
                scrub: true,
                pin: true
            },
            scale: 0.2,
            opacity: 0
        });
    }, container);

    return () => {
        ctx.revert(); // Cleans up all GSAP animations created in the context
    };
}
