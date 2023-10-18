// Environment variables
require("dotenv").config();

// Database connection
const { initDatabase } = require("./db");
initDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const { swaggerDocs: v1SwaggerDocs } = require('./routes/swagger')

const userRouter = require("./routes/usuario");
const taskRouter = require("./routes/tarea");
const labelRouter = require("./routes/etiqueta");
const authRouter = require("./routes/auth");

// Middlewares para el manejo de errores
const validationError = require("./middlewares/validation-error");
const unknownError = require("./middlewares/unknown-error");

app.use(userRouter);
app.use(taskRouter);
app.use(labelRouter);
app.use(authRouter);

// Manejo de errores
app.use(validationError);
app.use(unknownError);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('El backend funciona chido :D')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  v1SwaggerDocs(app, 8080);
})