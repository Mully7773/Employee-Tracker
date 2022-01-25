const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require ('console.table');


const myDb = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employeeManagement_db'
    },
    console.log(`Successfully connected to the employeeManagement_db database.`)
);

const openingQuestions = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'opList',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit']
            })
            .then((answer) => {
            switch (answer.opList) {
              case 'View All Employees':
                viewEmployees();
                break;
              case 'Add Employees':
                addEmployees();
                break;
              case 'Update Employee Role':
                updateRole();
                break;
              case 'View All Roles':
                  viewRoles();
                break;
              case 'Add Role':
                addRoles();
                break;
              case 'View All Departments':
                viewDepartments();
                break;
              case 'Add Department':
                addDepartments();
                break;
              case 'Exit':
                  myDb.end();
                  console.log('Farewell')
                  break;
            }
            
        })
    }

//Functions for viewing:
const viewEmployees = () => {
    myDb.query(`SELECT * FROM employee`, (err, result) => {
      if (err) {
        console.log(err);
      }  
        console.table(result);
        openingQuestions();
    });
};

const viewRoles = () => {
    myDb.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
            console.table(result);
            openingQuestions();
    });
};

const viewDepartments = () => {
    myDb.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
            console.table(result);
            openingQuestions();
    });
};


//Functions for adding:
const addDepartments = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the new department?'
            })
            .then((answer) => {
                let name = JSON.stringify(answer.department);
                console.log(`Added ${name} to the database!`)
            }
        )};

const addRoles = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the new role?'
            })
            .then((answer) => {
                let name = JSON.stringify(answer.role);
                console.log(`Added ${name} to the database!`)
            }
        )};


const addEmployees = () => {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'employee',
                message: 'What is the name of the new employee?'
            })
            .then((answer) => {
                let name = JSON.stringify(answer.employee);
                console.log(`Added ${name} to the database!`)
            }
        )};


//Function for updating employee role:
const updateRole = () => {

}
        
    




openingQuestions();