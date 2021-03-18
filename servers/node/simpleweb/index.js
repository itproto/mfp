const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('How are you doing, bro?Ok?');
});

const handle = app.listen(process.env.SIMPLE_WEB_PORT, () => {
  console.log('Listening on port ', handle.address().port);
});
