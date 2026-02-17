// Import GSAP Core
import { gsap } from './lib/gsap/index.js';

// Import Demos (We will create these next)
// For now, we'll placeholder imports
import { initCoreDemo } from './demos/core.js';
import { initScrollDemo } from './demos/scroll.js';
import { initDraggableDemo } from './demos/draggable.js';
import { initTextDemo } from './demos/text.js';
import { initMorphDemo } from './demos/morph.js';
import { initFlipDemo } from './demos/flip.js';
import { initObserverDemo } from './demos/observer.js';
import { initDrawDemo } from './demos/draw.js';
import { initPathDemo } from './demos/path.js';
import { initSplitDemo } from './demos/split.js';
import { initSmootherDemo } from './demos/smoother.js';
import { initPhysicsDemo } from './demos/physics.js';
import { initEaseDemo } from './demos/ease.js';
import { initToDemo } from './demos/scrollto.js';

// State
let currentCleaner = null;

const demos = {
  core: initCoreDemo,
  scroll: initScrollDemo,
  drag: initDraggableDemo,
  text: initTextDemo,
  morph: initMorphDemo,
  flip: initFlipDemo,
  observer: initObserverDemo,
  draw: initDrawDemo,
  path: initPathDemo,
  split: initSplitDemo,
  smooth: initSmootherDemo,
  physics: initPhysicsDemo,
  ease: initEaseDemo,
  to: initToDemo
};

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Logic
  const navBtns = document.querySelectorAll('.nav-btn');
  const container = document.getElementById('demo-container');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Cleanup previous demo
      if (currentCleaner) {
        currentCleaner();
        currentCleaner = null;
      }

      // Clear container
      container.innerHTML = '';

      // Load new demo
      const target = btn.dataset.target;
      if (demos[target]) {
        currentCleaner = demos[target](container);
      }
    });
  });

  // Load Core demo by default
  // demos.core(container); // Or wait for user
  document.querySelector('[data-target="core"]').click();
});
