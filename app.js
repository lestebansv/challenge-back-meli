const express = require('express');
var cors = require('cors');
const api = require('./routes/index.routes.js');
const app = express();
const port = 3001;

//cors exception
app.use(cors());

//routes
app.use('/api/items', api);

app.listen(port, () => {
  console.log(`App BACK MELI listening on port ${port}`)
});