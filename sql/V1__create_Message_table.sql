CREATE TABLE message (
    id INT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created timestamp NOT NULL,
    updated timestamp DEFAULT NOW()
);
