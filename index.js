const mysql = require("mysql")
const inquirer = require("inquirer")
const consoleTable = require("console.table");
const { throwError } = require("rxjs");
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Stephen1000!',
  database: 'employeeTrackerDb',
});

connection.connect((err)=> {
    if(err) throw err
    //maybe call runApp() outside of this function if err
      runApp()
});
function runApp() {
    inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Remove an employee",
        "Remove a role",
        "Remove a department",
        "Update employee roles",
        "Exit"
      ]
    }])
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        // case "Remove an employee":
        //   removeEmployee();
        //   break;
        // case "Remove a role":
        //   removeRole();
        //   break;
        // case "Remove a department":
        //     removeDepartment();
        //     break;
        case "Update employee roles":
          selectEmp();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};
const viewDepartments = () => {
    connection.query("SELECT * FROM departments", (err, res) => {
        if(err) throw err
        console.table(res)
        runApp()
    });
};
const viewRoles = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
        if(err) throw err
        console.table(res)
        runApp()
    });
};
const viewEmployees = () => {
    connection.query("SELECT * FROM employees", (err, res) => {
        if(err) throw err
        console.table(res)
        runApp()
    });
};

const addDepartment = () => {
    inquirer.prompt([

        {
          name: "addDpt", 
          type: "input",
          message: "What is the name of the new department?",

        }
    ]) .then((response) => {
        connection.query("INSERT INTO departments SET ?", {
            name: response.addDpt,
        },
        (err,res)=>{
            if(err) throw err
            console.log("successfully added department!")
            runApp()
        }
        )

    })
}
const addRole = () => {
    connection.query("SELECT * FROM departments", (err,res) => {
        if(err) throw err 

    
    inquirer.prompt([

        {
          name: "addNewRole", 
          type: "input",
          message: "What is the title of the new role?",

        },
        {
          name: "newSalary", 
          type: "number",
          message: "What will the salary be for the new title?",

        },
        {
          name: "departmentId", 
          type: "rawlist",
          message: "What department is this role in?",
          choices: res.map(item => item.name)
        }
    ]) .then((response) => {
        const chosenDepartment = res.find(dept => dept.name === response.departmentId)
        connection.query("INSERT INTO roles SET ?", {
            title: response.addNewRole,
            salary: response.newSalary,
            department_id: chosenDepartment.id

    },
           function(err,res){
            if(err) throw err
            console.log("successfully added new role!")
            runApp()
        }
        )

    })
}
)}
const addEmployee = () => {
connection.query("SELECT * FROM roles", (err,res)=>{
  if(err) throw err 

inquirer.prompt([
  {
    name: "firstName",
    type: "input",
    message: "What is their first name?"
  },
  {
    name: "lastName",
    type: "input",
    message: "What is their last name?"
  },
  {
    name: "roleId", 
    type: "rawlist",
    message: "What is their role?",
    choices: res.map(item => item.title)
  },
]).then((response) => {
        const chosenRole = res.find(dept => dept.title === response.roleId)
        connection.query("INSERT INTO employees SET ?", {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: chosenRole.id,
    },
           function(err,res){
            if(err) throw err
            console.log("successfully added new employee!")
            runApp()
        }
        )

    })
})
}
