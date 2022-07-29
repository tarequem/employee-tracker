const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'm98o7!a6#t43a@2R23',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

module.exports = db;