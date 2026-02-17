import { gsap } from '../lib/gsap/index.js';

export function initCoreDemo(container) {
    // Create HTML structure
    const content = document.createElement('div');
    content.innerHTML = `
    <h2>Core Animations</h2>
    <div style="display:flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 50px;">
      <div class="box box-1">Rotate</div>
      <div class="box box-2">Scale</div>
      <div class="box box-3">Yoyo</div>
    </div>
    <div style="text-align:center; margin-top: 50px;">
      <button id="replay-core" class="nav-btn">Replay</button>
    </div>
  `;
    container.appendChild(content);

    // Animation Logic
    const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });

    timeline
        .to('.box-1', { rotation: 360, borderRadius: '50%' })
        .to('.box-2', { scale: 1.5, backgroundColor: '#ff0055' }, '-=0.5')
        .to('.box-3', { y: -50, yoyo: true, repeat: 3 }, '-=0.5');

    // Replay Button
    document.getElementById('replay-core').addEventListener('click', () => {
        timeline.restart();
    });

    // Cleanup function
    return () => {
        timeline.kill();
    };
}
