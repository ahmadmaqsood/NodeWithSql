-- Readme file notes
-- source schema.sql;
-- There are four ways to use mysql query
-- 1st WorkBunch
-- 2nd MySql package -> nodejs
-- 3rd CLI
-- 4th using sql files

CREATE TABLE user{
id VARCHAR(50) PRIMARY KEY,
username VARCHAR(50) UNIQUE,
email  VARCHAR(50)  UNIQUE NOT NULL,
password  VARCHAR(50) NOT NULL
};

