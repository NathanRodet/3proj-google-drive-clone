const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./utils/db');
const app = express();
require('dotenv/config');

// Configuration variables
const port = process.env.PORT || 3001;

// App configuration
app.use(bodyParser.json());
app.use(cors());

// Routes

const indexRouter = require('./routes/index/index');
const authRouter = require('./routes/auth/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);


app.listen(port, (error) => {
  console.log('Server listening on port ' + port);
  (error) => console.log(error);
});
