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

app.listen(process.env.PORT, () => console.log(`Server su port ${process.env.PORT}`));