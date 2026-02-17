import { gsap } from '../lib/gsap/index.js';
import { TextPlugin } from '../lib/gsap/TextPlugin.js';
import { ScrambleTextPlugin } from '../lib/gsap/ScrambleTextPlugin.js';

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export function initTextDemo(container) {
    container.innerHTML = `
    <h2>Text Effects</h2>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
      <div class="text-demo" id="typewriter"></div>
      <div class="text-demo" id="scramble" style="color: #ff0055; margin-top: 20px;"></div>
    </div>
    <button id="restart-text" class="nav-btn">Restart Text</button>
  `;

    const tl = gsap.timeline();

    tl.to('#typewriter', {
        text: {
            value: "Hello, this is typing...",
            delimiter: ""
        },
        duration: 2,
        ease: "none"
    })
        .to('#typewriter', {
            text: { value: "Now backing up...", newClass: "class2" },
            duration: 1.5,
            delay: 1
        })
        .to('#scramble', {
            scrambleText: {
                text: "ScrambleText is Amazing!",
                chars: "XOox01",
                revealDelay: 0.5,
                speed: 0.3
            },
            duration: 1.5
        });

    document.getElementById('restart-text').addEventListener('click', () => {
        tl.restart();
    });

    return () => {
        tl.kill();
    };
}
