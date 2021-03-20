const fs = require("fs");

const { sendViewedMessageDirect, sendViewedMessageIndirect } = require('./send-message');
function setupHandlers(app, messageChannel) {
    app.get("/video", (req, res) => { // Route for streaming video.

        const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error("An error occurred ");
                res.sendStatus(500);
                return;
            }

            res.writeHead(200, {
                "Content-Length": stats.size,
                "Content-Type": "video/mp4",
            });

            fs.createReadStream(videoPath).pipe(res);

            // sendViewedMessageDirect(videoPath);
            sendViewedMessageIndirect(messageChannel, videoPath);
        });
    });
}


const { startHttpServer } = require('./http-server');
const { connectRabbit } = require('./rabbit');

function main() {
    return connectRabbit()
        .then(messageChannel => {
            return startHttpServer(messageChannel)(setupHandlers)
        });
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });