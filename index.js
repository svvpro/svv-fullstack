const app = require('./app');

//Регистрируем глобальную переменную port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server has running on port ${port}`));
