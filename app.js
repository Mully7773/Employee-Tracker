const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require ('console.table');


// const myDb = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'rootroot',
//         database: 'employeeManagement_db'
//     },
//     console.log(`Successfully connected to the employeeManagement_db database.`)
// );

const openingQuestions = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'opList',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            },
        ).then((answer) => {
            switch (answer.opList) {
              case 'View All Employees':
                console.log('Oranges are $0.59 a pound.');
                break;
              case 'Add Employees':
                  console.log('aasdf')
                break;
              case 'Update Employee Role':
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
              case 'View All Roles':
                  console.log('asdfa')
                break;
              case 'Add Roles':
                  console.log('asf')
                break;
              case 'View All Departments':
                  console.log('afad')
                break;
              case 'Add Department':
                  console.log('asdf')
                break;
              default:
                console.log(`Sorry, we are out of ${choice}.`);
            }
            
        })
    }
        
    




openingQuestions();