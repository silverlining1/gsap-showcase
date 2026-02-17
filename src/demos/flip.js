import { gsap } from '../lib/gsap/index.js';
import { Flip } from '../lib/gsap/Flip.js';

gsap.registerPlugin(Flip);

export function initFlipDemo(container) {
    const style = document.createElement('style');
    style.textContent = `
    .group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      min-height: 120px;
      padding: 10px;
      border: 1px solid #333;
      border-radius: 8px;
    }
    .box-flip {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
    }
    .vertical {
      flex-direction: column;
    }
  `;
    document.head.appendChild(style);

    container.innerHTML = `
        < h2 > Flip Plugin Layout</h2 >
    <p>Click "Toggle Layout" or click individual boxes to swap groups.</p>
    <button id="toggle-layout" class="nav-btn" style="margin-bottom: 20px;">Toggle Layout</button>
    
    <div id="group1" class="group">
      <div class="box-flip" id="box1" style="background: #ff0055;">1</div>
      <div class="box-flip" id="box2" style="background: #00ccff;">2</div>
      <div class="box-flip" id="box3" style="background: #ffcc00; color: black;">3</div>
    </div>
    
    <div id="group2" class="group">
      <div class="box-flip" id="box4" style="background: #88ce02; color: black;">4</div>
    </div>
  `;

    const group1 = document.getElementById('group1');
    const group2 = document.getElementById('group2');
    const boxes = document.querySelectorAll('.box-flip');

    // 1. Toggle Layout
    document.getElementById('toggle-layout').addEventListener('click', () => {
        const state = Flip.getState(boxes);
        group1.classList.toggle('vertical');
        Flip.from(state, {
            duration: 1,
            ease: "power1.inOut",
            absolute: true // helps with flexbox resizing
        });
    });

    // 2. Swap Groups on Click
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const state = Flip.getState(boxes);
            if (box.parentElement === group1) {
                group2.appendChild(box);
            } else {
                group1.appendChild(box);
            }
            Flip.from(state, {
                duration: 0.7,
                ease: "power1.out",
                scale: true
            });
        });
    });

    return () => {
        if (style.parentNode) style.parentNode.removeChild(style);
    };
}
