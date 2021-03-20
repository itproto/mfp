const sendViewedMessageDirect = (videoPath) => {
    const req = require('http').request(
        "http://history/viewed",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    req.on("close", () => {
        console.log("Sent 'viewed' message to history microservice");
    });

    req.on("error", (err) => {
        console.error("Failed to send 'viewed' message!");
        console.error(err && err.stack || err);
    });

    req.write(JSON.stringify({ videoPath }));
    req.end();
};

function sendViewedMessageIndirect(messageChannel, videoPath) {
    console.log(`Publishing message on "viewed" exchange.`, videoPath);
    messageChannel.publish("viewed", "", Buffer.from(JSON.stringify({ videoPath })));
}

module.exports = {
    sendViewedMessageDirect,
    sendViewedMessageIndirect
}
