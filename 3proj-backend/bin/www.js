const express = require('express')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const swaggerUI = require("swagger-ui-express");
const cookieParser = require('cookie-parser');
const YAML = require('yamljs');
const db = require('../utils/db');
require('dotenv/config');

// Configuration variables
const port = process.env.PORT || 3001;
const specs = YAML.load('./swagger/main.yml');

// App configuration

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

// Routes

const indexRouter = require('../routes/index');
const authRouter = require('../routes/auth');
const usersRouter = require('../routes/users');
const driveRouter = require('../routes/drive');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/drive', driveRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Listener

app.listen(port, (error) => {
  console.log('Server listening on port ' + port);
  if (error) {
    console.log('Failed to listen on port ' + port);
    console.error(error);
  }
});
