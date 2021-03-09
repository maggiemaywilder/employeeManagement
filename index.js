const mysql = require('mysql');
const inquirer = require('inquirer');
const connect = require('./private/connect');
const cTable = require('console.table');
// const listManagers = require('./constructors/queries');
const Employee = require('./constructors/employee');


const deleteRole = () => {
    inquirer.prompt({
        name: 'deleteRole',
        type: 'rawlist',
        message: 'Which role would you like to remove?',
        choices: [query]
    })
    .then ((answers) =>{
        console.log(answers);
        let query = `DELETE FROM role AS r
                    WHERE r.id 
                    IN (SELECT r.id 
                        FROM roles AS r
                        WHERE r.title = ${answers} LIMIT 1`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log(res);
            start();
        })
    })
};

const idManagers = () => {
    let query = `SELECT ${m.first_name} ${m.last_name} AS Manager FROM employee e INNER JOIN employee m ON m.id = e.manager_id ORDER BY Manager`;
    RTCPeerConnection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
};

const start = () => console.log('connected');

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    idManagers();

    // start();
});