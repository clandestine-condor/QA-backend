const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database-postgres')

app.use(express.json());

app.get('/qa/questions/:id', (req, res) => {
    const {id} = req.params;
    // const query = 'SELECT * FROM questions WHERE product_id = $1';
    // const query = 'SELECT * FROM questions INNER JOIN answers ON answers.question_id = questions.question_id INNER JOIN photos ON answer_id = a_id WHERE product_id = $1';
    const query = 'SELECT json_build_object("product_id": $1, "results": json_agg(json_build_object("question_id", q.question_id, "question_body", q.question_body, "question_date", q.question_date, "asker_name", q.asker_name, "question_helpfulness", q.question_helpfulness, "reported", q.reported, "answers", answers))) questions FROM ';
    db.query(query, [id], (err, results) => {
        if(err) {
            res.status(404).send(err);
        } else {
            res.send(results.rows);
        }
    });
});

app.get('/qa/questions/:id/answers', (req, res) => {
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