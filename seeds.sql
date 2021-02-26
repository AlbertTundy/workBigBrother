USE employeeTrackerDb ;
INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Mike', 'Manson', 2, 1),
    ('Ashley', 'Daumer', 3, NULL);