const router = require("express").Router();

const TaskController = require('./controllers/TaskController');

router.get('/:id', TaskController.findOne);
router.get('/', TaskController.findAll);
router.post('/', TaskController.create);
router.put('/:id/:type', TaskController.update);
router.delete('/:id', TaskController.destroy);

module.exports = router;