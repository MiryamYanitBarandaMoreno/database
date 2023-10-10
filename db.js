const mysql = require('mariadb');

const config= {
    host: 'localhost',
    port: 3306,
    database: 'backend',
    user: 'root',
    password: '',
    connectionLimit: 10
};

const pool = mysql.createPool(config);

module.exports = pool;