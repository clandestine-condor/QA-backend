DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;

CREATE TABLE photos(
    p_id INT,
    answer_id INT,
    url VARCHAR(1000),
    PRIMARY KEY (p_id)
);
-- \copy photos(p_id, answer_id)
-- FROM '/Users/nickwai1/Desktop/photos.csv'
-- DELIMITER ','
-- CSV HEADER;
-- FOREIGN KEY (answer_id) REFERENCES answers(answer_id)

CREATE TABLE answers (
    a_id INT NOT NULL,
    question_id INT NOT NULL,
    body VARCHAR(1000),
    answer_date VARCHAR(100) NOT NULL,
    answerer_name VARCHAR(100),
    answer_email VARCHAR(100),
    reported BOOLEAN DEFAULT FALSE,
    helpfulness INT DEFAULT 0,
    photo_id INT,
    PRIMARY KEY (a_id)
);

-- \copy answers(a_id, question_id, body, answer_date, answerer_name, answer_email, reported, helpfulness)
-- FROM '/Users/nickwai1/Desktop/answers.csv'
-- DELIMITER ','
-- CSV HEADER;
-- FOREIGN KEY (photo_id) REFERENCES photos(photo_id)

CREATE TABLE questions (
    question_id INT NOT NULL,
    product_id INT NOT NULL,
    question_body VARCHAR(1000),
    question_date VARCHAR(100) NOT NULL,
    asker_name VARCHAR(100),
    asker_email VARCHAR(50),
    reported BOOLEAN DEFAULT FALSE,
    question_helpfulness INT DEFAULT 0,
    answer_id INT,
    PRIMARY KEY (question_id)
);

--  \copy questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
-- FROM '/Users/nickwai1/Desktop/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

ALTER TABLE photos ADD CONSTRAINT photofk FOREIGN KEY (answer_id) REFERENCES answers (id);
ALTER TABLE answers ADD CONSTRAINT answfk FOREIGN KEY (question_id) REFERENCES question (id);
ALTER TABLE answers ADD CONSTRAINT answfk FOREIGN KEY (photo_id) REFERENCES photos (id);
ALTER TABLE questions ADD CONSTRAINT quesfk FOREIGN KEY (answer_id) REFERENCES answers (id);
