CREATE VIEW employees_under
AS SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS dept, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employee AS e LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN departments AS d
ON r.department_id = d.id
LEFT JOIN employee AS m 
ON e.manager_id = m.id;

CREATE VIEW dept_list
AS SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title AS title, d.name AS dept, r.salary
FROM employee AS e LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN departments AS d
ON r.department_id = d.id;

CREATE VIEW all_depts
AS SELECT name FROM departments;

CREATE VIEW roles
AS SELECT title FROM role;

CREATE VIEW nameId
AS SELECT CONCAT(first_name, ' ', last_name) AS fullName, id
FROM employee;



