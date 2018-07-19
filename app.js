const express = require('express');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const analiticsRoutes = require('./routes/analitics');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/analitics', analiticsRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/category', categoryRoutes);

module.exports = app;