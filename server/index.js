const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const userRouter = require('./routers/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested Resource not found' });
});

app.listen(PORT, () => {
  // console.log('Server is live!');
});
