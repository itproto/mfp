---
to: packages/<%= name.toLowerCase() %>/src/bootstrap.js
---
const mount = (el) => {
    el.innerHTML = `hello <%= name.toLowerCase() %>`;
}

const mountStandalone = (selector) => {
    if (process.env.NODE_ENV === 'development') {
        const localEl = document.querySelector(selector);
        if (localEl) {
            mount(localEl);
        }
    }
}

mountStandalone('#_<%= name.toLowerCase() %>-dev')

export { mount }