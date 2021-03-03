const mysql = require('mysql');
const inquirer = require('inquirer');
const password = require('./private/password');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: `${password}`,
    database: 'human_resources_db',
});

const start = () => console.log('connected');

connection.connect((err) => {
    if (err) throw err;
    start();
});