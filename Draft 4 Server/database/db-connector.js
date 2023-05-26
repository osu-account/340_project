let mysql = require('mysql')

let pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_hallchri',
    password        : '0591',
    database        : 'cs340_hallchri'
})

module.exports.pool = pool;