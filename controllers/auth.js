const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {

    //проверяем существует ли запись с указанным email
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //сравниваем переданый пароль с шифрованым в базе
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Используя библиотеку jsonwebtoken генерируем токен
            //первым параметром передаем данные которые будем шифровать в токен
            //вторым параметром ключ шифрования
            //третим параметром время жизни в секундах 60сек * 60ми = 1час
            const token = jwt.sign(
                {email: candidate.email, id: candidate._id},
                key.jwt,
                {
                    expiresIn: 60 * 60
                });

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают'
            });
        }
    } else {
        res.status(404).json({
            message: 'E-mail не найден'
        });
    }
};

module.exports.register = async function (req, res) {
    //проверяем существует ли запись с указанным email
    //конструкция await ждет отработки указанной функции и затем продолжает выполнение кода
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //Если email  существует отображаем ошибку
        res.status(409).json({
            message: 'Такой email уже существует'
        })
    } else {
        //гененрируем salt - хеш который будет уникальным для шифрования пароля
        const salt = bcrypt.genSaltSync(10);
        //получаем переданый пароль
        const password = req.body.password;


        //Создаем нового пользователя
        const user = await new User({
            email: req.body.email,
            //Создаем шифрованый пароль
            password: bcrypt.hashSync(password, salt)
        });

        // Для того чтобы обработать ошибки мы оборачиваем код в стандартную конструкцию try/catch
        try {
            //Ожидаем ответ результата сохранения данных
            await user.save();
            //Если успешно возвращаем  статус ответа и сохраненную запись
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};