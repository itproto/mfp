const mongodb = require("mongodb");

if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

//
// Connect to the database.
//
function connectDb() {
    return mongodb.MongoClient.connect(DBHOST)
        .then(client => {
            return client.db(DBNAME);
        });
}

module.exports = { connectDb };