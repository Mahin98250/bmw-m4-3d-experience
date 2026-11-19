# BMW M4 — 3D Scroll Experience

A scroll-driven, storytelling-style 3D advertisement page for the BMW M4, built with three.js. The whole car is generated in code (no model file). The camera orbits as you scroll and the wheels spin with your scroll.

## Structure
- `index.html` — page layout, styling and story text
- `js/scene.js` — renderer, reflections, lights, floor
- `js/car.js` — body, glass, lights, wheels
- `js/hood.js` — front bonnet (parametric panel, power-dome ridges, shut lines)
- `js/main.js` — camera path, speed lines, render loop

Open `index.html` in a browser, or enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

Concept project. Not affiliated with BMW AG.
