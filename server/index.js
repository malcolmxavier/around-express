const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5f9252109af16b6ebc97df02',
  };
  next();
});

app.use('/', userRouter);

app.use('/', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested Resource not found' });
});

app.listen(PORT, () => {
  // console.log('Server is live!');
});
