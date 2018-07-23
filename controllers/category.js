const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({user: req.user.id});
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    try {
        console.log(req.file);
        const category = await new Category({
            name: req.body.name,
            user: req.user.id,
            //Если есть загружаемый файл то записываем в file его путь если нет то пустую строку
            imageSrc: req.file ? req.file.path : ''
        });
        res.status(201).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = function (req, res) {
    const update = {
        name: req.body.name
    };

    if (req.file) {
        imageSrc: req.file.path
    };

    try {
        const category = Category.findOneAndUpdate(
            {_id: req.body.id},
            {$set: update},
            //Вернуть обновленные данные
            {new: true}
        );

        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        //Удаляем категорию
        await Category.remove({_id: req.params.id});
        //Удаляем все позиции относящиеся к данной категории
        await Position.remove({category: req.params.id});
        
        res.status(200).json({
            message: 'Категория удалена'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};