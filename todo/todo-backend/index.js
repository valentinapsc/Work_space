const express = require('express');
const cors = require('cors');

const app = express();

// Abilita CORS per permettere al frontend di comunicare con il backend
app.use(cors());

// Abilita il parsing del JSON nelle richieste
app.use(express.json());

// Inizializziamo un array in memoria per i Todo
let todos = [
  { id: 1, title: 'Prima attività', completed: false },
  { id: 2, title: 'Seconda attività', completed: true },
];

// GET: Recupera tutti i todo
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST: Aggiunge un nuovo todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = Date.now(); // Assegna un id unico usando il timestamp
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Aggiorna un todo esistente
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo non trovato' });
  }
});

// DELETE: Elimina un todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// Imposta la porta e avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});