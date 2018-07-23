const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
//запрос будет выглядеть следующи образом
// localhost:5000/api/order?offset=2&limit=5

    const query = {
        user: req.user.id,
    };

    //добалям в query если есть start(Дата старта)
    if (req.query.start) {
        query.date = {
            //$gte - означает больше или равно
            $gte: кeq.query.start
        }
    }

    //добалям в query если есть end(Дата конца)
    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        //$lte - означает меньше или равно
        query.date['$lte'] = req.query.end;
    }

    //добалям в query если хотим получить конкретный номер заказа
    if (req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)


        res.status(200).json(orders);
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.create = async function (req, res) {
    try {
        //ищем последнюю по дате запись
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});

        //если существует запись то присваиваем ее в maxOrder,
        //если ниодной записи нет то присваиваем 0
        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();
        res.status(201).json(order);
    } catch (e) {
        errorHandler(res, e);
    }
};

