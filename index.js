const inquirer = require('inquirer');
const db = require('./db/connection');
const connection = require('./db/connection');
const cTable = require('console.table');

//function to initialize inquirer and present options (viewing database, adding to database, closing program)
const choicesPrompt = () => {
    console.log 
    (`
    ++++++++++++++++++++
     MY EMPLOYEE TRACKER
    ++++++++++++++++++++
    `)
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
                updateEmployeeRole();
            } else  if (chosenPrompt.option === 'close program') {
                db.end();
            }
        })
}

//view departments in database
function viewDepartments() {
    connection.query(`SELECT * FROM departments;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        choicesPrompt();
    })
}

//view roles in database
function viewRoles() {
    connection.query(`SELECT roles.role_id, roles.role_name, roles.salary, departments.department_id, departments.department_name FROM roles JOIN departments ON roles.department_id = departments.department_id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        choicesPrompt();
    })
}

//view employees in database
function viewEmployees() {
    connection.query(`SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_id, roles.role_name, departments.department_name, departments.department_id, roles.salary, employees.manager_id FROM employees JOIN roles ON employees.role_id = roles.role_id JOIN departments ON roles.department_id = departments.department_id;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        choicesPrompt();
    })
}

//add departments to database
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
            connection.query(`INSERT INTO departments (department_name) VALUES ('${response.department_name}')`, 
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.department_name} has been added. \n`);
                choicesPrompt();
            })
        })
};

//add roles to database
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
                            console.log('\n Enter a numerical value \n');
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

//add employees to database
function addEmployee() {
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        let employeeRole = res.map(roles => ({ name: roles.role_name, value: roles.role_id}));
        connection.query(`SELECT * FROM employees;`, (err, res) => {
            if (err) throw err;
            let employeeList = res.map(employees => ({name: employees.first_name + ' ' + employees.last_name, value: employees.employee_id}));
            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: "What is the employee's first name?"
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: "What is the employee's last name?"
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: "What is the employee's role?",
                        choices: employeeRole
                    },
                    {
                        name: 'manager',
                        type: 'list',
                        message: "Who is the employee's manager?",
                        choices: employeeList
                    }
                ])
                .then((response) => {
                    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role}', '${response.manager}')`,
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n ${response.first_name} has been added. \n`);
                        choicesPrompt();
                    })
                })
        })
    })
}

//update the roles of employees
function updateEmployeeRole() {
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        let employeeRole = res.map(roles => ({ name: roles.role_name, value: roles.role_id}));
        connection.query(`SELECT * FROM employees;`, (err, res) => {
            if (err) throw err;
            let employeeList = res.map(employees => ({name: employees.first_name + ' ' + employees.last_name, value: employees.employee_id}));
            inquirer
                .prompt([
                    {
                        name: 'employee',
                        type: 'list',
                        message: "Which employee is having their role updated?",
                        choices: employeeList
                    },
                    {
                        name: 'updatedRole',
                        type: 'list',
                        message: "Which role will be added to?",
                        choices: employeeRole
                    }
                ])
                .then((response) => {
                    connection.query(`UPDATE employees SET ? WHERE ?`,
                    [
                        {
                            role_id: response.updatedRole
                        },
                        {
                            employee_id: response.employee
                        }
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n The role has been updated. \n`);
                        choicesPrompt();
                    })
                })
        })
    })
}

// function for updating employee managers
// function for viewing employees by manager
// function for viewing employees by department
// function for deleting departments, roles, and employees
// function for viewing the total utilized budget of a department—in other words, the combined salaries of all employees in that department

choicesPrompt();