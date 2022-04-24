const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('../utils/db');
require('dotenv/config');

// Configuration variables
const port = process.env.PORT || 3001;

// App configuration

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

// Routes

const indexRouter = require('../routes/index');
const authRouter = require('../routes/auth');
const usersRouter = require('../routes/users');
const driveRouter = require('../routes/drive');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/drive', driveRouter);

// Listener

app.listen(port, (error) => {
  console.log('Server listening on port ' + port);
  if (error) {
    console.log('Failed to listen on port ' + port);
    console.error(error);
  }
});
