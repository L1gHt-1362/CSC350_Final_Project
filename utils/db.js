const mysql = require('mysql2');
export const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'project_final',
    password: '6702870',
    database: 'project_final'
})