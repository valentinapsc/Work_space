require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const todosRoutes = require('./routes/todos.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todos', todosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server su port ${PORT}`));