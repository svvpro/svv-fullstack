const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            //user у нас добавляется в каждом запросе благодаря passport
            user: req.user.id
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id,
        }).save();
        res.status(201).json(position);
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            //Находим запись с нужным id
            {_id: req.params.id},
            //Обновляем данные
            {$set: req.body},
            //Указывает что нужно вернуть обновленные данные
            {new: true}
        );

    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Position.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция удалена'
        });
    } catch (e) {
        errorHandler(res, e)
    }
};