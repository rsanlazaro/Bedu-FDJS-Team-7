const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi =require('swagger-ui-express');

const options = {
    definition: {
        openapi : '3.0.0',
        info: { title: 'To-Do API', version: '1.0.0'},
    },
    apis:['routes/authRoutes.js', 'routes/etiqueta.js','routes/tarea.js', 'routes/usuario.js','db.js'],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('./routes/usuario', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('./routes/usuario.json', (req, res) => {
        res.setHeader('Content.Type', 'application/json');
        res.send(swaggerSpec)
    })
    console.log(`version 1: http://localhost:8080/routes/usuario`)
}

module.exports = {swaggerDocs};