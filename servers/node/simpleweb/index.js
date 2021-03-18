var express = require("express");
var cors = require("cors");
var app = express();

let rabbitMQ = require('./rmq/publisher');
let stockData = require('./stockData');

app.use(cors({
  exposedHeaders: ['Content-Length', 'Content-Type'],
}));


app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
// https://medium.com/swlh/real-time-exchange-information-with-microservices-and-nodejs-e6bf6623bca6
app.get("/getstockData", function (req, res) {
  res.send(stockData.data.sort((a, b) => a.name.localeCompare(b.name)))
})

app.post('/update', async (req, res) => {

  try {
    var updateStock = req.body;
    findAndUpdateStock(updateStock);

    console.log("StockData:" + JSON.stringify(stockData.data));
    console.log("Stock:" + JSON.stringify(updateStock));

    rabbitMQ("updateStock", JSON.stringify(updateStock));

    return res.status(200).json({ status: "succesfully update" });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


function findAndUpdateStock(updateStock) {
  findStockIndex = stockData.data.findIndex(o => o.name === updateStock.name);
  stockData.data.splice(findStockIndex, 1);
  stockData.data.push(updateStock);
}

const server = app.listen(process.env.SIMPLE_WEB_PORT, () => {
  console.log('Listening on port ', server.address().port);
});


const io = require('socket.io')(server);

module.exports = {
  socket: io.on('connection', (socket) => {
    console.log('User Socket Connected');
    socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
  })
};

require('./rmq/consumer')