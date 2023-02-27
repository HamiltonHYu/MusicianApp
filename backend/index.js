const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const apiRouter = require('./routes');

const pathToEnv = path.resolve(__dirname, '.env');
dotenv.config(pathToEnv);

const PORT = process.env.PORT || 3000;

const DEFAULT_ERROR = {
  message: 'An error occurred.',
  log: '[Global error handler] An error occurred in an unknown middleware.',
  status: 500,
};

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.get('*', ({ originalUrl }, res) => {
  console.error(
    `[404] User tried to hit the non-existent endpoint ${originalUrl}`
  );
  return res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const { message, status, log } = Object.assign(DEFAULT_ERROR, err);
  console.error(log);
  return res.status(status).send(message);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
