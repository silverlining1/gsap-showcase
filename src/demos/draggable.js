import { gsap } from '../lib/gsap/index.js';
import { Draggable } from '../lib/gsap/Draggable.js';
import { InertiaPlugin } from '../lib/gsap/InertiaPlugin.js';

gsap.registerPlugin(Draggable, InertiaPlugin);

export function initDraggableDemo(container) {
    container.innerHTML = `
    <h2>Draggable & Inertia</h2>
    <p>Throw the ball! It has momentum.</p>
    <div class="draggable-container">
      <div class="drag-item" id="ball">Drag Me</div>
    </div>
    
    <div style="margin-top: 30px; display: flex; gap: 20px; justify-content: center;">
        <div class="box spin-drag">Spin Me</div>
    </div>
  `;

    // Draggable Ball
    Draggable.create('#ball', {
        type: 'x,y',
        bounds: '.draggable-container',
        inertia: true,
        onClick: function () {
            console.log('clicked');
        },
        onDragEnd: function () {
            console.log('drag ended');
        }
    });

    // Draggable Spinner
    Draggable.create('.spin-drag', {
        type: 'rotation',
        inertia: true
    });

    return () => {
        // Kill all draggables
        Draggable.get('#ball')?.kill();
        Draggable.get('.spin-drag')?.kill();
    };
}
