const { Pool } = require('pg');
const env = require('../config.js');

const pool = new Pool(env);

module.exports = pool;

// create config.js file or .env -- git ignore .js files