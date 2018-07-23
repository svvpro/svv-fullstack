const express = require('express');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
//upload.single('image') добавляет загрузку одиночного файла по полю image
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router;