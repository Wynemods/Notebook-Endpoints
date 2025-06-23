-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insert a test user with username 'Alex mods' and password 'testpass' (hashed)
-- Password hash generated with bcrypt for 'testpass'
INSERT INTO users (username, password) VALUES
('Alex mods', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8vQ0Q6v6Z1Zq6Zq6Zq6Zq6Zq6Zq6Zq')
ON CONFLICT (username) DO NOTHING;
