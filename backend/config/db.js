const mysql = require('mysql2');

// Credenciales para la conexión con la Base de Datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '54321',
    database: 'cafeteria'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

module.exports = connection;