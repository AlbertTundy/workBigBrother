DROP DATABASE IF EXISTS employeeTrackerDb;
CREATE DATABASE employeeTrackerDb;
USE employeeTrackerDb;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    name varchar(20)
);
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    title varchar(20) NOT NULL, 
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL
);
CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    first_name varchar(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);