CREATE TABLE message (
    id INT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW()
);
