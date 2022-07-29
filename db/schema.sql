-- DROP TABLE IF EXISTS employees;
-- DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);