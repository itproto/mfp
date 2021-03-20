const express = require('express');
const startHttpServer = (...params) => (setupHandlers) => {
    return new Promise(resolve => { // Wrap in a promise so we can be notified when the server has started.
        const app = express();
        app.set('json spaces', 2)
        app.use(express.json())
        setupHandlers(app, ...params);

        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            resolve(port);
        });
    });
}

module.exports = { startHttpServer }
