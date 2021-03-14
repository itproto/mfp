import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

const mount = (el) => {
    ReactDOM.render(
        <App />,
        el
    )
}

const mountStandalone = (selector) => {
    if (process.env.NODE_ENV === 'development') {
        const localEl = document.querySelector(selector);
        if (localEl) {
            mount(localEl);
        }
    }
}

mountStandalone('#_marketing-dev')

export { mount }