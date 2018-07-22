module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        //если у error существует message (Стандартная ошибка) то возвращаем его иначе просто error
        message: error.message ? error.message : error
    })
};
