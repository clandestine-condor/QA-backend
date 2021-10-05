const express = require('express');
const app = express();
const PORT = 3000;
const db = require('../database-postgres')

app.use(express.json());

app.get('/qa/questions/:id', (req, res) => {
    const {id} = req.params;
    const query = `SELECT 
                    questions.question_id,
                    questions.question_body,
                    to_timestamp(questions.question_date/1000) as question_date,
                    questions.asker_name,
                    questions.question_helpfulness,
                    questions.reported,
                        jsonb_object_agg(a_id, json_build_object('id', a_id, 'body', body, 'date', to_timestamp(answer_date/1000), 'answerer_name', answerer_name, 'helpfulness', helpfulness, 'photos',   (
                                    SELECT
                                        json_agg(json_build_object('id', p_id, 'url', url))
                                        FROM photos
                                    WHERE
                                        photos.answer_id = answers.a_id
                                    GROUP BY
                                        photos.answer_id)))
                        AS answers
                    FROM
                        questions
                        JOIN answers ON answers.question_id = questions.question_id
                        WHERE questions.product_id = $1
                    GROUP BY
                        questions.question_id`;
    
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            const ans = result.rows[0].answers;
            for (const a in ans ) {   
                let  answer = ans[a];
                    if ( answer.photos === null) {  
                        answer.photos = [];
                    }
            }
            const questions = {product_id: id, results: [result.rows[0]]};
            res.send(questions);
        }
    });
});

app.get('/qa/questions/:id/answers', (req, res) => {
    const {id} = req.params;
    const query = `SELECT
                        json_agg(json_build_object('answer_id', a_id, 'body', body, 'date', to_timestamp(answer_date / 1000), 'answerer_name', answerer_name, 'helpfulness', helpfulness, 'photos', (
                                    SELECT
                                    coalesce(
                                        json_agg(json_build_object('id', p_id, 'url', url)), '[]')
                                        FROM photos
                                    WHERE
                                        photos.answer_id = answers.a_id
                                    GROUP BY
                                        photos.answer_id)))
                    FROM
                        questions
                        JOIN answers ON answers.question_id = questions.question_id
                    WHERE
                        questions.product_id = $1
                    GROUP BY
                        questions.question_id`;
    db.query(query, [id], (err, result) => {
        if(err) {
            res.status(404).send(err);
        } else {
            const ans = result.rows[0].json_agg;
            for (const a of ans) {
                if ( a.photos === null) {  
                    a.photos = [];
                }
            }
            const answers = {question: id, page: 0, count: 5, results: ans};
            res.send(answers);
        }
    });
}); 

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});