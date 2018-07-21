const express = require('express');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const analiticsRoutes = require('./routes/analitics');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const app = express();

//подключаемся к базе данных
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Database connected...'))
    .catch((error) => console.error(error));

//подключаем библиотеку body-parser
const bodyParser = require('body-parser');
//детализирует все запросы в терминале
app.use(require('morgan')('dev'));
//декодируем входящий url
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/analitics', analiticsRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/category', categoryRoutes);

app.use(require('cors')());

module.exports = app;