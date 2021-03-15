const mount = (el) => {
    el.innerHTML = `hello micro-front`;
}

const mountStandalone = (selector) => {
    if (process.env.NODE_ENV === 'development') {
        const localEl = document.querySelector(selector);
        if (localEl) {
            mount(localEl);
        }
    }
}

mountStandalone('#_micro-front-dev')

export { mount }