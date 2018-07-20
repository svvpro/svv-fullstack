module.exports.login = function (req, res) {
    res.status(200).json({
            email: req.body.login,
            password: req.body.password,
    })
};

module.exports.register = function (req, res) {
    res.status(200).json({
        register: true
    })
};