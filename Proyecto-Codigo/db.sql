CREATE DATABASE IF NOT EXISTS login_db DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE login_db;
CREATE TABLE IF NOT EXISTS users (
    email varchar(100) NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    password varchar(255) NOT NULL
);