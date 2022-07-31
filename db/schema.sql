DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(30),
    salary INTEGER,
    department_id INTEGER
);