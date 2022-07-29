const inquirer = require('inquirer');
const db = require('./db/connection');
const connection = require('./db/connection');

//function to initialize inquirer and present options
const choicesPrompt = () => {
    return inquirer
        .prompt ([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'close program']
            }
        ])
        .then(function (chosenPrompt) {
            if (chosenPrompt.option === 'view all departments') {
                viewDepartments();
            } else if (chosenPrompt.option === 'view all roles') {
                viewRoles();
            }else if (chosenPrompt.option === 'view all employees') {
                viewEmployees();
            }else if (chosenPrompt.option === 'add a department') {
                addDepartment();
            }else if (chosenPrompt.option === 'add a role') {
                addRole();
            }else if (chosenPrompt.option === 'add an employee') {
                addEmployee();
            }else if (chosenPrompt.option === 'update an employee role') {
                updateEmployee();
            } else  if (chosenPrompt.option === 'close program') {
                db.end();
            }
        })
}

//functions for viewing 
function viewDepartments() {
    connection.query(`SELECT * FROM departments;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        choicesPrompt();
    })
}

// function viewEmployees() {
    
// }

// function viewRoles() {
    
// }
//functions for adding/updating with inquirer
function addDepartment() {
    return inquirer
        .prompt ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the department name'
            }
        ])
        .then(function (response) {
            var query = 
            `INSERT INTO departments (department_name)
            VALUES ('{$response.departmentName}')`;
            db.query(query, function (err, res) {
                console.log(
                    `Added department ${response.departmentName}`
                    );
            });
            choicesPrompt();
        })
};
// function addRole() {
    
// }

// function addEmployee() {
    
// }

// function updateEmployee() {
    
// }

choicesPrompt();