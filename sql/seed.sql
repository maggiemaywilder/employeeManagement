DROP DATABASE IF EXISTS human_resources_db;
CREATE DATABASE human_resources_db;

USE human_resources_db;

-- depts: id(auto incr), department name --
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- role: id(AI), title(varchar), salary(decimal 2 places), dept_id (links to AI number in dept table) --
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INTEGER,
    PRIMARY KEY (id)
);

-- employee: id(AI), first_name, last_name, role_id (links to role table), manager_id(links to AI id of manager employee) --
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id)
);

INSERT INTO departments (name)
VALUES ("Silly Walks"), ("Silly Songs"), ("Silly Stories"), ("Silly Jokes"), ("Shenanigans"), ("Silly Memes");

INSERT INTO roles (title, salary, department_id)
VALUES ("Walk Initiator", 75000, 1), ("Understudy", 50000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Singer/Songwriter", 75000, 2), ("Lyrics tester", 40000, 2), ("Song distributor", 45000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Story Teller", 75000, 3), ("Story Listener", 55000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Jokester", 75000, 4), ("Laugh Measurer", 50000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Shenanigator", 75000, 5), ("Understudy", 40000, 5);

INSERT INTO roles (title, salary, department_id)
VALUES ("Meme Manager", 75000, 6), ("Meme Distributor", 60000, 6), ("Meme Tester", 40000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Monty", "Python", 1), ("Weird", "Al", "Singer/Songwriter", 3), ("Monster", "McGoo", 6), ("Fozzy", "Bear", 8), ("Girly", "McSue", 10), ("James", "Kuma", 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Cleese", 2, 1), ("Willy", "Wonka", 2, 1), ("Napoleon", "XIV", 5, 2), ("Witch", "Doctor", 4, 2), ("Raffi", "Sings", 2, 2), ("Crocodile", "Dundee", 7, 3), ("Crocky", "Chomper", 7, 3), ("Dude", "Snarfles", 9, 4), ("Moomoo", "LeGreat", 11, 5), ("Tweeter", "Bot", 13, 6), ("Frank", "Trollington", 14,	6)

