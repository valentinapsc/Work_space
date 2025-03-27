const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { getAll, create, update, delete: remove } = require('../controllers/todos.controller');

router.use(auth);
router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;