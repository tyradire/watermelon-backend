require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const { errors } = require('celebrate');
const cors = require('cors');
const models = require('./models/models');
const fileUpload = require('express-fileupload');
const appRouter = require('./routes/index');
const { 
  sendError, 
} = require('./middlewares/sendError');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://watermelon-shop.ru',
    'https://watermelon-shop.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(appRouter);

app.use(errors());
app.use(sendError);

app.get('/', (req, res) => {
  res.status(200).json({message: 'Working!'})
})

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  } catch (e) {
      console.log(e);
  }
};

start();