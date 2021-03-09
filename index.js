const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./private/connect');
const cTable = require('console.table');

const start = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View employees by department',
            'View employees by manager',
            'View all departments',
            'View all roles',
            'Add a department',
            'Add a role',
            'Add employee',
            'Update employee role',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all employees':
                viewEmployees();
                break;

            case 'View employees by department':
                empByDept();
                break;

            case 'View employees by manager':
                empByManager();
                break;
        
            case 'View all departments':
                viewDept();
                break;
    
            case 'View all roles':
                viewRole();
                break;
    
            case 'Update employee role':
                updateRole();
                break;

            case 'Add a department':
                addDept();
                break;

            case 'Add a role':
                addRole();
                break;
    
            case 'Add employee':
                addEmployee();
                break;    

            default:
                console.log('Invalid action');
                break;
        }
    })
};

const viewEmployees = () => {
    let query = `SELECT e.id, e.first_name, e.last_name, r.title AS position, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name ) AS manager
                FROM employee AS e LEFT JOIN role AS r
                ON e.role_id = r.id
                LEFT JOIN departments AS d
                ON r.department_id = d.id
                LEFT JOIN employee AS m 
                ON e.manager_id = m.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start(); 
    });
};

const empByDept = () => {
    connection.query('SELECT name FROM departments', (err, res) => {
        if (err) throw err;        
        inquirer.prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices() {
                    const choiceArray = [];
                    res.forEach(({ name }) => {
                        choiceArray.push(name);
                    });
                    return choiceArray;
                    }, 
                message: 'For which department would you like to view employees?',
            },
        ])
        .then((answers) => {
            let query = `SELECT id, first_name, last_name, title FROM hr_db.dept_list WHERE dept = ?`;
            connection.query(query, [answers.choice], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
    })
};

const empByManager = () => {
    connection.query(`SELECT DISTINCT concat(m.first_name, ' ', m.last_name) AS name FROM employee AS m INNER JOIN employee AS e WHERE e.manager_id = m.id`, (err, res) => {
        if (err) throw err;
    inquirer
    .prompt([
        {
            name: 'choice',
            type: 'rawlist',
            choices() {
                const choiceArray = [];
                res.forEach(({ name }) => {
                    choiceArray.push(name);
                });
                return choiceArray;
            },
            message: 'For which manager would you like to view employees?',
        },
        ])
        .then((answers) => {
            let query = `SELECT id, first_name, last_name, title FROM hr_db.employees_under WHERE manager_name = ?`;
            connection.query(query, [answers.choice], (err, res) => {
                if (err) throw err;
                console.table(res);
                start();
            })
        })
    })
};

const viewDept = () => {
    connection.query('SELECT * FROM hr_db.all_depts', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewRole = () => {
    let query = `SELECT r.title FROM role AS r`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const updateRole = () => {
    const query = `SELECT title, CONCAT(first_name, ' ', last_name) AS empName FROM hr_db.dept_list`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'empName',
                type: 'rawlist',
                choices() {
                    const nameArray = [];
                    res.forEach(({ empName }) => {
                        nameArray.push(empName);
                    });
                    return nameArray;
                },
                message: 'Which employee is getting a new role?',
            },
            {
                name: 'title',
                type: 'rawlist',
                choices() {
                    const titleArray = [];
                    res.forEach(({ title }) => {
                        titleArray.push(title);
                    });
                    return titleArray;
                },
                message: 'What is their new role?'
            },
        ])
        .then((answers) => {
            var splitName = answers.empName.split(' ');
            let query2 = `UPDATE hr_db.employee SET role_id = (SELECT id FROM role WHERE title = '${answers.title}') WHERE first_name = '${splitName[0]}' AND last_name = '${splitName[1]}'`; 
            connection.query(query2, (err, res) => {
                if (err) throw err;
                console.log(`${answers.empName} was successfully updated,`);
                start();
        });
    });
});
};

const addDept = () => {
    inquirer.prompt({
        name: 'newDept',
        type: 'input',
        message: 'What department would you like to add?'
    })
    .then((answers) => {
        let query = `INSERT INTO departments (name) VALUES ('${answers.newDept}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(`${answers.newDept} has been added to the available departments.`);
            start();
        })
    })
};

const addRole = () => {
    let query = `SELECT name FROM departments`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the position you want to add?', 
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary associated with this title?',
                validate(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                name: 'department',
                type: 'rawlist',
                choices() {
                    let deptArray = [];
                    res.forEach(({ name }) => {
                        deptArray.push(name);
                    });
                    return deptArray;
                },
                message: 'What department does this role fall under?',
            },
        ]) 
        .then((answers) => {
        let query = `INSERT INTO role (title, salary, department_id) 
                    VALUES ('${answers.title}', '${answers.salary}', (SELECT id FROM departments WHERE name = '${answers.department}'))`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(`${answers.title} has been added as an available role.`);
            start();
        })
    })
});
};

const addEmployee = () => {
    connection.query('SELECT title, manager_name FROM hr_db.employees_under', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the new employee?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the new employee?',
            },
            {  
                name: 'jobTitle',
                type: 'rawlist',
                choices() {
                    var titleArray = [];
                    res.forEach((element) => {
                        titleArray.push(element.title);
                    })
                    titleArray = Array.from(new Set(titleArray));
                    return titleArray;
                },
                message: 'What role will they be filling?',
            },
            { 
                name: 'manager',
                type: 'rawlist',
                choices() {
                    var managerArray = [];
                    res.forEach((element) => {
                        managerArray.push(element.manager_name);
                    })
                    managerArray = Array.from(new Set(managerArray));
                        if(managerArray[0] === null) {
                            managerArray.shift();
                        };
                    return managerArray;
                },
                message: 'Who will be their manager?',
            },
        ])
    .then((answers) => {
        let nameSplit = answers.manager.split(' ');
        console.log(nameSplit);
        connection.query(`SELECT id FROM employee WHERE first_name = '${nameSplit[0]}' AND last_name ='${nameSplit[1]}'`, (err, res) => {
            if (err) throw err; 
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', (SELECT id FROM role WHERE title = '${answers.jobTitle}'), '${res[0].id}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(`${answers.firstName} ${answers.lastName} has been hired.`);
            start();
        })
        })
       
        
    })
})
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
