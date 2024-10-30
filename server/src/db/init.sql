-- Create database
CREATE DATABASE IF NOT EXISTS team_meetings;
USE team_meetings;

-- Create tables
CREATE TABLE IF NOT EXISTS development_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  development_group_id INT,
  description TEXT,
  start_time DATETIME,
  end_time DATETIME,
  room VARCHAR(255),
  FOREIGN KEY (development_group_id) REFERENCES development_groups(id)
);

-- Insert initial data
INSERT INTO development_groups (name) VALUES 
  ('UI Team'),
  ('Mobile Team'),
  ('React Team'),
  ('Backend Team'); 