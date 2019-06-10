const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bayong-ph',
    password: 'messaging'
});

module.exports = pool.promise();