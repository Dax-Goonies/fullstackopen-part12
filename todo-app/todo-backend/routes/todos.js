const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const current = await redis.get('added_todos');
  const count = current ? Number(current) +1 : 1;
  await redis.set('added_todos', count)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.todo.id,
    { text, done },
    { new: true },
  );
  res.json(updated);

});

/* GET statistics */
router.get('/statistics', async (req, res) => {
 const count = await redis.get('added_todos');
 res.json({ added_todos: count ? Number(count) : 0 });
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
