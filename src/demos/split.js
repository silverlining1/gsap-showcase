import { gsap } from '../lib/gsap/index.js';
import { SplitText } from '../lib/gsap/SplitText.js';

gsap.registerPlugin(SplitText);

export function initSplitDemo(container) {
    container.innerHTML = `
    <h2>SplitText Plugin</h2>
    <div style="font-size: 2.5rem; font-weight: bold; text-align: center; margin-bottom: 30px;">
      <div id="split-lines">SplitText makes typography animations easy and fun!</div>
    </div>
    <div style="font-size: 2rem; color: #88ce02; text-align: center;">
      <div id="split-chars">GSAP IS AWESOME</div>
    </div>
    <div style="margin-top: 30px; text-align: center;">
      <button id="replay-split" class="nav-btn">Replay</button>
    </div>
  `;

    let tl = gsap.timeline();

    // Split the text
    const childSplit = new SplitText("#split-lines", {
        type: "lines",
        linesClass: "split-child"
    });

    const parentSplit = new SplitText("#split-lines", {
        type: "lines",
        linesClass: "split-parent" // overflow hidden container
    });

    const charsSplit = new SplitText("#split-chars", { type: "chars" });

    // Style the parent to hide overflow for the reveal effect
    gsap.set(".split-parent", { overflow: "hidden" });

    tl.from(childSplit.lines, {
        duration: 1.5,
        yPercent: 100,
        ease: "power4.out",
        stagger: 0.1
    })
        .from(charsSplit.chars, {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.05
        }, "-=1");

    document.getElementById('replay-split').addEventListener('click', () => {
        tl.restart();
    });

    return () => {
        tl.kill();
        childSplit.revert();
        parentSplit.revert();
        charsSplit.revert();
    };
}
