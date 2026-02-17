import { gsap } from '../lib/gsap/index.js';
import { Observer } from '../lib/gsap/Observer.js';

gsap.registerPlugin(Observer);

export function initObserverDemo(container) {
    // Styles for full-screen sections
    const style = document.createElement('style');
    style.textContent = `
    .observer-section {
      height: 60vh;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(100%);
      transition: none; /* GSAP handles this */
    }
    .observer-wrapper {
      position: relative;
      width: 100%;
      height: 60vh;
      overflow: hidden;
      border: 1px solid #444;
      border-radius: 12px;
    }
  `;
    document.head.appendChild(style);

    container.innerHTML = `
        < h2 > Observer Plugin</h2 >
    <p>Swipe up/down or scroll to change slides.</p>
    <div class="observer-wrapper">
      <div class="observer-section" style="background: #88ce02; color: black; opacity: 1; visibility: visible; transform: translateY(0);">Slide 1</div>
      <div class="observer-section" style="background: #00ccff; color: black;">Slide 2</div>
      <div class="observer-section" style="background: #ff0055;">Slide 3</div>
    </div>
  `;

    const sections = document.querySelectorAll('.observer-section');
    let currentIndex = 0;
    let isAnimating = false;

    function gotoSection(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        let from = sections[currentIndex];
        let to = sections[index];

        // Determine direction for animation
        let yStart = direction === 1 ? '100%' : '-100%';
        let yEnd = direction === 1 ? '-100%' : '100%';

        gsap.set(to, { y: yStart, autoAlpha: 1, zIndex: 1 });
        gsap.set(from, { zIndex: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentIndex = index;
            }
        });

        tl.to(from, { y: yEnd, duration: 0.8, ease: "power2.inOut" })
            .to(to, { y: '0%', duration: 0.8, ease: "power2.inOut" }, "<");
    }

    const observer = Observer.create({
        target: ".observer-wrapper",
        type: "wheel,touch,pointer",
        onUp: () => {
            if (currentIndex > 0) gotoSection(currentIndex - 1, -1);
        },
        onDown: () => {
            if (currentIndex < sections.length - 1) gotoSection(currentIndex + 1, 1);
        },
        tolerance: 10,
        preventDefault: true
    });

    return () => {
        observer.kill();
        if (style.parentNode) style.parentNode.removeChild(style);
    };
}
