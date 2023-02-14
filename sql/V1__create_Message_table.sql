CREATE TABLE message (
  id SERIAL PRIMARY KEY NOT NULL,
  author VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);
