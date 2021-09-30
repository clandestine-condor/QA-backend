const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database-postgres')

app.use(express.json());

app.get('/qa/questions/:id', (req, res) => {
    const {id} = req.params;
    const query = 'SELECT * FROM questions WHERE product_id = $1';
    db.query(query, [id], (err, results) => {
        if(err) {
            res.status(404).send(err);
        } else {
            res.send(results.rows);
        }
    });
});

app.get('/qa/answers/:id/answers', (req, res) => {
    const {id} = req.params;
    const query = 'SELECT * FROM answers WHERE question_id = $1';
    db.query(query, [id], (err, results) => {
        if(err) {
            res.status(404).send(err);
        } else {
            res.send(results.rows);
        }
    });
}); 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});