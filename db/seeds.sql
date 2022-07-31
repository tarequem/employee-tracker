INSERT INTO departments (department_name)
VALUES
('Operations'),
('Marketing'),
('Human Resources'),
('Information Technology'),
('Finances');

INSERT INTO roles (role_name, salary, department_id)
VALUES
('Chief Operating Officer', 150000, 1),
('Operating Deputy', 100000, 1),
('Community Manager', 100000, 2),
('Community Moderator', 50000, 2),
('HR Leader', 100000, 3),
('HR Representative', 65000, 3),
('Database Administrator', 130000, 4),
('Juniour Administrator', 90000, 4),
('Accountant', 90000, 5),
('Accountant Assistant', 65000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Job', 'Jab', 1, NULL),
('Jim', 'Jam', 2, 1),
('Jane', 'Jan', 3, 1),
('Qasima', 'Vasima', 4, 3),
('Arnold', 'Donald', 4, 3),
('Gupreet', 'Vanfleet', 5, 1),
('Kawhi', 'Leonard', 6, 6),
('Fred', 'Vanfleet', 6, 6),
('Pascal', 'Slakam', 6, 6),
('Elizabeth', 'Second', 7, 1),
('Justine', 'Trudeau', 8, 10),
('Joe', 'Biden', 8, 10),
('Mary', 'Antoinette', 9, 1),
('Margeret', 'Atwood', 10, 13),
('Pla', 'To', 10, 13);