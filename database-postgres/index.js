const { Pool } = require('pg');

const pool = new Pool({
    user: 'nick',
    host: 'localhost',
    database: 'postgres',
    password: '',
    post: 3211,
});

module.exports = pool;