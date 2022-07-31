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

function viewRoles() {
    connection.query(`SELECT roles.role_id, roles.role_name, roles.salary, departments.department_name, departments.department_id FROM roles JOIN departments ON roles.department_id = departments.department_id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        choicesPrompt();
    })
}

//functions for adding/updating with inquirer
function addDepartment() {
    return inquirer
        .prompt ([
            {
                type: 'input',
                name: 'department_name',
                message: 'Enter the department name'
            }
        ])
        .then((response) => {
            connection.query(`INSERT INTO departments (name) VALUES ('${response.department_name}')`, 
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.department_name} has been added. \n`);
                choicesPrompt();
            })
        })
};
function addRole() {
    connection.query(`SELECT * FROM departments;`, (err, res) => {
        if (err) throw err;
        let roleDepartment = res.map(departments => ({name: departments.department_name, value: departments.department_id}));
        inquirer
            .prompt([
                {
                    name: 'departmentName',
                    type: 'list',
                    message: 'Which department does this role belong to?',
                    choices: roleDepartment
                },
                {
                    name: 'role_name',
                    type: 'input',
                    message: 'What is the name of the role?'
                },
                {
                    name: 'role_salary',
                    type: 'input',
                    message: 'What is the salary for this role?',
                    validate: (salaryValue) => {
                        if (isNaN(salaryValue)) {
                            console.log('Enter a numerical value');
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ])
            .then((response) => {
                connection.query(`INSERT INTO roles (role_name, salary, department_id) VALUES ('${response.role_name}', '${response.role_salary}', '${response.departmentName}')`,
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.role_name} has been added. \n`);
                    choicesPrompt();
                })
            })
    })
}

// function addEmployee() {
    
// }

// function updateEmployee() {
    
// }

choicesPrompt();