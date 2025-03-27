const { Todo } = require('../models');

exports.getAll = async (req, res) => {
  const todos = await Todo.findAll({ where: { userId: req.user.id } });
  res.json(todos);
};

exports.create = async (req, res) => {
  const todo = await Todo.create({ ...req.body, userId: req.user.id });
  res.status(201).json(todo);
};

exports.update = async (req, res) => {
  const [updated] = await Todo.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
  return updated ? res.sendStatus(204) : res.sendStatus(404);
};

exports.delete = async (req, res) => {
  const deleted = await Todo.destroy({ where: { id: req.params.id, userId: req.user.id } });
  return deleted ? res.sendStatus(204) : res.sendStatus(404);
};