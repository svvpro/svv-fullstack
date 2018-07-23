const multer = require('multer');
const moment = require('moment');

//storage - описывает место хранения и названия файлов
//
const storage = multer.diskStorage({
    //cb - сокращенно callback
    destination(req, file, cb) {
        //указываем директорию где будем хранить файл
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        //указываем название файла
        cb(null, `${date}-${file.originalname}`);
    }
});

//Ограничения по типу загружаемых файлов
const fileFilter = (require, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//ограничение на размер файла
const limits = {
    fileSize: 1024 * 1024 * 5
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});

// по скольку ввышеописнном объекте ключ и значение совпадают мы можем использовать сокращенную запись
//  module.exports = multer({
//      storage, fileFilter, limits
//  });
