// db/connection.js 
const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Celulares3000.', 
    database: 'db_ventas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool; 