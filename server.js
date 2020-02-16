const express = require('express');
const bodyParser = require('body-parser');
var cors =  require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var gurgianRouter = require('./routes/guargian');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/', gurgianRouter);

app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);