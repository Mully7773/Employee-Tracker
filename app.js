const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require ('console.table');
const { restoreDefaultPrompts } = require('inquirer');


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
                myDb.query(`INSERT INTO department(name) VALUES (?);`, answer.department, (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answer.department} to the database!`)
                    viewDepartments();
                })
                // let name = JSON.stringify(answer.department);
                // console.log(`Added ${name} to the database!`)
            }
        )};

const addRoles = () => {
    myDb.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        result = result.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
    
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
        
            {
                type: 'list',
                name: 'departmentRole',
                message: 'Which department does the role belong to?',
                choices: result
            }
        ])
            .then((answer) => {  //cannot get (? ? ?) to work...
                myDb.query(`INSERT INTO role SET ?`, 
                {title: answer.role,
                 salary: answer.salary,
                 department_id: answer.departmentRole,
                }, 
                (err, result) => {
                    if (err) throw err; }
                );
                    console.log(`Added ${answer.role} to the database!`)
                    viewRoles();
            })
            
            
        });
};
        
    

const addEmployees = () => {
    myDb.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err;
        result = result.map((roles) => {
            return {
                name: roles.title,
                value: roles.id,
            };
        });

        myDb.query(`SELECT first_name, last_name, manager_id FROM employee`, (err, resultm) => {
            if (err) throw err;
            resultm = resultm.map((managers) => {
                return {
                    name: managers.first_name,
                    lastName: managers.last_name,
                    value: managers.manager_id,
                };
            });

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first',
                message: `What is the employee's first name?`
            },
            {
                type: 'input',
                name: 'last',
                message: `What is the employee's last name?`
            },
            {
                type: 'list',
                name: 'role',
                message: `What is the employee's role?`,
                choices: result
            },
            {
                type: 'list',
                name: 'manager',
                message: `Who is the employee's manager?`,
                choices: resultm
                // ["None", "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd"]
            },
        ])
            .then((answer) => {myDb.query(`INSERT INTO employee SET ?`, 
            {first_name: answer.first,
             last_name: answer.last,
             role_id: answer.role,
             manager_id: answer.manager
            }, 
            (err, result) => {
                if (err) throw err; }
            );
            console.log(`Added ${answer.first} ${answer.last} to the database!`)
            viewEmployees();
            })
          
            

        })



        });
    
};

//Function for updating employee role:
const updateRole = () => {
myDb.query(`SELECT * FROM employee`, (err, resultu) => {
    if (err) throw err;
    resultu = resultu.map((employee) => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        };
    });
    myDb.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err;
        result = result.map((role) => {
            return {
                name: role.title,
                value: role.id,
            }
        });
    
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeSelect',
                message: `Which employee's role do you want to update?`,
                choices: resultu,
            },
            {
                type: 'list',
                name: 'roleSelect',
                message: `Which role do you want to assign the selected employee?`,
                choices: result,
            },
        ])
        .then ((answers) => {
            myDb.query(`UPDATE employee SET ? WHERE ?`,
            [
                {
                    role_id: answers.roleSelect,
                },
                {
                    id: answers.employeeSelect,
                },
            ],
            function (err) {
                if (err) throw err;
            }
            );
            console.log(`Updated employee's role!`)
            viewEmployees();
        });
    });
});
};
openingQuestions();