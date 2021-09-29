DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;

-- CREATE TABLE photos(
--     p_id INT AUTO_INCREMENT,
--     url VARCHAR(100), -- regix check if valid url// design custom check 
--     PRIMARY KEY (p_id)
-- )

CREATE TABLE photos(
    p_id INT,
    answer_id INT,
    url VARCHAR(1000),
    PRIMARY KEY (p_id)
);
 -- FOREIGN KEY (answer_id) REFERENCES answers(answer_id)

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
);

--template for loading into psql
-- CREATE TABLE answers(
--     a_id INT NOT NULL,
--     question_id INT NOT NULL,
--     body VARCHAR(1000),
--     answer_date VARCHAR(100) NOT NULL,
--     answerer_name VARCHAR(100),
--     answer_email VARCHAR(100),
--     reported BOOLEAN DEFAULT FALSE,
--     helpfulness INT DEFAULT 0,
--     PRIMARY KEY (a_id)
-- );

-- \copy answers(a_id, question_id, body, answer_date, answerer_name, answer_email, reported, helpfulness)
-- FROM '/Users/nickwai1/Desktop/answers.csv'
-- DELIMITER ','
-- CSV HEADER;


CREATE TABLE questions(
    question_id INT NOT NULL,
    question_body VARCHAR(200),
    question_date DATE NOT NULL,
    asker_name VARCHAR(15),
    question_helpfulness INT DEFAULT 0,
    reported BOOLEAN DEFAULT FALSE,
    answer_id INT,
    product_id INT,
    PRIMARY KEY (question_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
);

-- CREATE TABLE questions(
--     question_id INT,
--     product_id INT,
--     question_body VARCHAR(1000),
--     question_date VARCHAR(100) NOT NULL,
--     asker_name VARCHAR(100),
--     asker_email VARCHAR(50),
--     reported BOOLEAN DEFAULT FALSE,
--     question_helpfulness INT DEFAULT 0,
--     PRIMARY KEY (question_id)
-- )

--  \copy questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
-- FROM '/Users/nickwai1/Desktop/questions.csv'
-- DELIMITER ','
-- CSV HEADER;