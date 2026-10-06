# Mohamed — Full Stack Web Developer Portfolio

A polished responsive portfolio with:
- cinematic terminal → `hello` opening
- Light / Dark mode
- English / Arabic RTL
- font selector
- custom desktop cursor
- responsive navigation
- services, skills, education, projects and contact
- six project case-study modals
- Gmail compose contact flow
- localStorage preferences

## Assets
`assets/1.png` through `assets/6.png` are the six project covers in portfolio order. `assets/hero-photo.jpg` is your real photo, cropped for the hero (edit the crop with `object-position` in `.hero-frame img`). `assets/me-original.jpg` is the untouched original.

## Personal setup
Open `script.js` and replace `YOUR_EMAIL@example.com` with the Gmail address that should receive contact messages. Add real Instagram/WhatsApp URLs where the placeholders are marked in `index.html`.

## Run
This is a static site. Open `index.html` directly, or serve the folder with any local static server.

## Where to edit
- `config.js` — email + WhatsApp / Instagram / GitHub links (used by the contact buttons, footer and Gmail form).
- `enhance.js` / `enhance.css` — custom cursor, smooth scroll, hover effects, intro sound.
- Projects grid columns: `.project-grid` in `enhance.css`.
- Avatar illustration: the `<svg class="avatar">` inside the About section of `index.html`.
- `sound.js` — intro sound + the "Click anywhere to start" gate (browsers only allow audio after one click/tap; if the browser already allows it, the gate is skipped automatically).
