const express = require('express');

const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
// Importamos el MiddleWare Error Handler
const errorHandler = require('./middleware/errorHandler');


// Configuracion Middleware con el servidor de Autorización 
const jwtCheck = auth({
    audience: 'http://localhost:3000/api/libros',
    issuerBaseURL: 'https://dev-0dkqym8wwvneyhwv.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});


const app = express();

app.use(express.json());

//Importamos el Router de Libros 
const librosRouter = require('./routes/libros');

// Configuramos el middleware de autenticacion
app.use('/libros', jwtCheck, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});