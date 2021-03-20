require('dotenv').config()
const express = require("express");
const app = express();

function setupHandlers(app) {
    app.get('/foo', (req, res) => {
        res.send('Wow2');
    });
}

function startHttpServer() {
    return new Promise(resolve => {
        const app = express();
        setupHandlers(app);
        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => { resolve(port); });
    });
}

function main() {
    return startHttpServer();
}

main().then((port) => console.log(`History on ${port}`))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });

