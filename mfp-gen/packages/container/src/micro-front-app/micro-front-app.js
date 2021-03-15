import { mount } from 'microFront/micro-front-boot'
export class MicroFrontShell extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div><h1>Shell</h1></div>';

        for (let i = 0; i < 10; i++) {
            let widget = new MicroFrontWidget();
            this.append(widget);
        }
    }
}

customElements.define('micro-front-shell', MicroFrontShell);

export class MicroFrontWidget extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div />'
        mount(this.firstChild);
    }
}
customElements.define('micro-front-widget', MicroFrontWidget);

