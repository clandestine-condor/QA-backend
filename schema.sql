CREATE DATABASE QA;

DROP TABLE IF EXISTS questions;

CREATE TABLE questions(
    question_id INT AUTO_INCREMENT,
    question_body VARCHAR(200),
    question_date DATE NOT NULL,
    asker_name VARCHAR(15),
    question_helpfulness INT,
    reported BOOLEAN NOT NULL,
    answer_id INT,
    product_id INT,
    PRIMARY KEY (question_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
)

DROP TABLE IF EXISTS answers;

CREATE TABLE answers(
    a_id INT AUTO_INCREMENT,
    body VARCHAR(200),
    answerer_name VARCHAR(20),
    helpfulness INT,
    reported BOOLEAN NOT NULL,
    photo_id INT,
    PRIMARY KEY (a_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
)

DROP TABLE IF EXISTS photos;

CREATE TABLE photos(
    p_id INT AUTO_INCREMENT,
    url VARCHAR(100)
)