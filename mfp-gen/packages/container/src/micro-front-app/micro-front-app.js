export class MicroFrontApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<h1>Micro here</h1>`;
    }
}

customElements.define('micro-front-app', MicroFrontApp);