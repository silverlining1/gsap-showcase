import { gsap } from '../lib/gsap/index.js';
import { ScrollToPlugin } from '../lib/gsap/ScrollToPlugin.js';

gsap.registerPlugin(ScrollToPlugin);

export function initToDemo(container) {
    container.innerHTML = `
    <h2>ScrollTo Plugin</h2>
    <div style="position:fixed; top: 100px; right: 20px; display:flex; flex-direction:column; gap:10px; z-index:100;">
        <button class="nav-btn" onclick="gsap.to(window, {scrollTo: '#sec1', duration: 1})">Section 1</button>
        <button class="nav-btn" onclick="gsap.to(window, {scrollTo: '#sec2', duration: 1})">Section 2</button>
        <button class="nav-btn" onclick="gsap.to(window, {scrollTo: '#sec3', duration: 1})">Section 3</button>
        <button class="nav-btn" onclick="gsap.to(window, {scrollTo: 0, duration: 1})">Top</button>
    </div>

    <div id="sec1" class="section" style="background: #111;">
      <h3>Section 1</h3>
    </div>
    <div id="sec2" class="section" style="background: #222;">
      <h3>Section 2</h3>
    </div>
    <div id="sec3" class="section" style="background: #333;">
      <h3>Section 3</h3>
    </div>
  `;

    // Expose gsap to window for the onclick handlers in HTML string
    window.gsap = gsap;

    return () => {
        // Window pollution cleanup
        // delete window.gsap; // Optional, might break other things if they rely on it
    };
}
