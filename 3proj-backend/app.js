const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const app = express();
require('dotenv/config');

// Configuration variables
const port = process.env.SERVER_PORT || 3001;

// App configuration
app.use(bodyParser.json());

// Routes

const indexRouter = require('./routes/index');

app.use('/', indexRouter);


app.listen(port, (error) => {
  console.log('Server listening on port ' + port + " | http://localhost:" + port);
  (error) => console.log(error);
});
