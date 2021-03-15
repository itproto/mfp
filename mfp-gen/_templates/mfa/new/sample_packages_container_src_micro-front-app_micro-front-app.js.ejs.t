---
to: sample/packages/<%= name.toLowerCase() %>/src/micro-front-app/micro-front-app.js
---
export class MicroFrontApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Micro here</h1>`;
    }
}

customElements.define('micro-front-app', MicroFrontApp);