DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;

CREATE TABLE photos(
    p_id INT AUTO_INCREMENT,
    url VARCHAR(100), -- regix check if valid url// design custom check 
    PRIMARY KEY (p_id)
)

CREATE TABLE answers(
    a_id INT AUTO_INCREMENT,
    body VARCHAR(200),
    answerer_name VARCHAR(20),
    helpfulness INT DEFAULT 0,
    reported BOOLEAN DEFAULT FALSE,
    photo_id INT,
    answer_date DATE NOT NULL,
    PRIMARY KEY (a_id),
    FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
)

CREATE TABLE questions(
    question_id INT AUTO_INCREMENT,
    question_body VARCHAR(200),
    question_date DATE NOT NULL,
    asker_name VARCHAR(15),
    question_helpfulness INT DEFAULT 0,
    reported BOOLEAN DEFAULT FALSE,
    answer_id INT,
    product_id INT,
    PRIMARY KEY (question_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
)
