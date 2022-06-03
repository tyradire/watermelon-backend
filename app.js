require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const { errors } = require('celebrate');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const appRouter = require('./routes/index');
const { 
  sendError, 
} = require('./middlewares/sendError');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
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