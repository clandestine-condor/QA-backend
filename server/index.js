const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database-postgres')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});