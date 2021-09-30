const { Pool } = require('pg');
const pool = new Pool({
    user: 'nick',
    host: 'localhost',
    database: 'postgres',
    password: '',
    post: 3211,
})

pool.query('SELECT $1::text as message', ['Hello from DB!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    pool.end()
})

module.exports = pool;