-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10),
  favourite_items INTEGER REFERENCES items(id) on DELETE CASCADE,
  messages_id INTEGER REFERENCES messages(id) on DELETE CASCADE,
  listings_id INTEGER
);
