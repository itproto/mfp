require('dotenv').config()

function setupHandlers(app, db, messageChannel) {

    const videosCollection = db.collection("videos");

    app.post("/viewed", (req, res) => { // Handle the "viewed" message via HTTP POST request.
        const { videoPath } = req.body; // Read JSON body from HTTP request.
        videosCollection.insertOne({ videoPath, rabbit: false }) // Record the "view" in the database.
            .then(() => {
                console.log(`Added video ${videoPath} to history.`);
                res.sendStatus(200);
            })
            .catch(err => {
                console.error(`Error adding video ${videoPath} to history.`);
                console.error(err && err.stack || err);
                res.sendStatus(500);
            });
    });

    app.get("/history", (req, res) => {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        videosCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(documents => {
                res.json({ history: documents });
            })
            .catch(err => {
                console.error(`Error retrieving history from database.`);
                console.error(err && err.stack || err);
                res.sendStatus(500);
            });
    });


    function consumeViewedMessage(msg) { // Handler for coming messages.
        const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
        console.log("Received a 'viewed' message", parsedMsg);
        return videosCollection.insertOne({ videoPath: parsedMsg.videoPath, rabbit: true }) // Record the "view" in the database.
            .then(() => {
                console.log("Acknowledging message was handled.");
                messageChannel.ack(msg); // If there is no error, acknowledge the message.
            });
    };

    consumeExchangeMessages(messageChannel, 'viewed', consumeViewedMessage);

}


const { startHttpServer } = require('./http-server');
const { connectDb } = require('./mongo');
const { connectRabbit, consumeExchangeMessages } = require('./rabbit');
function main() {
    return connectDb()
        .then(db => {
            return connectRabbit()
                .then(channel => startHttpServer(db, channel)(setupHandlers))
        });
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });