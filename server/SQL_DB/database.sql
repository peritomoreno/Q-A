CREATE TABLE Questions (
 product_id INTEGER,
 question_id BIGSERIAL,
 question_body VARCHAR(256),
 question_date VARCHAR(256),
 akser_name VARCHAR(256),
 question_helpfulness INTEGER,
 reported INTEGER
);


ALTER TABLE Questions ADD CONSTRAINT Questions_pkey PRIMARY KEY (question_id);

CREATE TABLE Answers (
 answer_id BIGSERIAL,
 question_id INTEGER,
 body VARCHAR(256),
 answer_name INTEGER,
 helpfulness INTEGER,
 date VARCHAR(256),
 reported INTEGER
);


ALTER TABLE Answers ADD CONSTRAINT Answers_pkey PRIMARY KEY (answer_id);

CREATE TABLE Photos (
 photo_id INTEGER,
 answer_id BIGSERIAL,
 photos VARCHAR(256)
);


ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (answer_id);

CREATE TABLE product (
 product_id BIGSERIAL
);


ALTER TABLE product ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);

ALTER TABLE Questions ADD CONSTRAINT Questions_product_id_fkey FOREIGN KEY (product_id) REFERENCES product(product_id);
ALTER TABLE Answers ADD CONSTRAINT Answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES Questions(question_id);