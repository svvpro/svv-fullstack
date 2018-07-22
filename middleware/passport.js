//Подключаем  JwtStrategy
const JwtStrategy = require('passport-jwt').Strategy;
//Подключаем модуль который будет извлекать jwt token
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const key = require('../config/keys');

//Определяем набор опций
const options = {
    //извлекаем bearer token из header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //указываем значение secret key которое используется при генерации token
    secretOrKey: key.jwt
};

//реализуем логику авторизации
module.exports = password => {
    password.use(
        //Добавляем новую стратегию
        new JwtStrategy(options, async (payload, done) => {
            try {
                //находим пользователя в БД в зависимости от присланного токена и получаем его email и id
                const user = await User.findById(payload.id).select('email id');
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.error(e);
            }
        })
    )
};
