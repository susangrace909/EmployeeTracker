// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require("console.table");

///// QUESTIONS/////

const questions = [
  //What would you like to do?
  {
    name: "opener",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View all departments",
      "View individual department",
      "Add a department",
      "Update a department",
      "Delete a department",
      "View all roles",
      "View individual role",
      "Add a role",
      "Update a role",
      "Delete a role",
      "View all employees",
      "View individual employee",
      "Add an employee",
      "Update an employee",
      "Delete an employee",
      "Exit",
    ],
    validate: (opener_1) => {
      if (opener_1) {
        return true;
      } else {
        console.log("Please pick one.");
        return false;
      }
    },
  },
];

const handleAnswer = (capturedResponse) => {
  //view all departments
  if (capturedResponse === "View all departments") {
    db.query("SELECT * FROM departments", (err, result) => {
      if (err) throw err;
      //throw stops running
      //           or use this:
      //           if (err) console.log(err)
      console.table(result);
      init();
    });
  }
  //view all roles
  if (capturedResponse === "View all roles") {
    db.query("SELECT * FROM roles", (err, result) => {
      if (err) throw err;
      console.table(result);
      init();
    });
  }
  //view all employees
  if (capturedResponse === "View all employees") {
    db.query("SELECT * FROM employee", (err, result) => {
      if (err) throw err;
      console.table(result);
      init();
    });
  }
  //view individual departments
  if (capturedResponse === "View individual department") {
    inquirer
      .prompt([
        {
          name: "individualDept",
          message: "Which department number would you like to view?",
          type: "input",
        },
      ])
      .then((response) => {
        const individualDeptQuery = `SELECT * FROM departments WHERE id = ?`;
        db.query(
          individualDeptQuery,
          response.individualDept,
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Here is your department!");
            init();
          }
        );
      });
  }
  //view individual roles
  if (capturedResponse === "View individual role") {
    inquirer
      .prompt([
        {
          name: "individualRole",
          message: "Which role number would you like to view?",
          type: "input",
        },
      ])
      .then((response) => {
        const individualRoleQuery = `SELECT * FROM roles WHERE id = ?`;
        db.query(
          individualRoleQuery,
          response.individualRole,
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Here is your role!");
            init();
          }
        );
      });
  }
  //view individual empoyees
  if (capturedResponse === "View individual employee") {
    inquirer
      .prompt([
        {
          name: "individualEmployee",
          message: "Which employee ID would you like to view?",
          type: "input",
        },
      ])
      .then((response) => {
        const individualEmployeeQuery = `SELECT * FROM employee WHERE id = ?`;
        db.query(
          individualEmployeeQuery,
          response.individualEmployee,
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Here is your employee!");
            init();
          }
        );
      });
  }
  //adding a department
  if (capturedResponse === "Add a department") {
    inquirer
      .prompt([
        {
          name: "departmentName",
          message: "What is the department name?",
          type: "input",
        },
      ])
      .then((response) => {
        const addDeptQuery = `INSERT INTO departments (name) VALUES (?)`;
        db.query(addDeptQuery, response.departmentName, (err, result) => {
          if (err) throw err;
          console.table(result);
          console.log("Department added!");
          init();
        });
      });
  }
  //adding a role
  if (capturedResponse === "Add a role") {
    inquirer
      .prompt([
        {
          name: "roleName",
          message: "What is the role title?",
          type: "input",
        },
        {
          name: "roleNameSalary",
          message: "What is the role salary?",
          type: "input",
        },
        {
          name: "roleNameId",
          message: "What is the role's department id?",
          type: "input",
        },
      ])
      .then((response) => {
        const addRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(
          addRoleQuery,
          [response.roleName, response.roleNameSalary, response.roleNameId],
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Role added!");
            init();
          }
        );
      });
  }
  //adding an employee
  if (capturedResponse === "Add an employee") {
    inquirer
      .prompt([
        {
          name: "employeeNameFirst",
          message: "What is the employee's first name?",
          type: "input",
        },
        {
          name: "employeeNameLast",
          message: "What is the employee's last name?",
          type: "input",
        },
        {
          name: "employeeRoleId",
          message: "What is the employee's role id?",
          type: "input",
        },
        {
          name: "employeeManagerId",
          message: "What is the employee's manager id?",
          type: "input",
        },
      ])
      .then((response) => {
        const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(
          addEmployeeQuery,
          [
            response.employeeNameFirst,
            response.employeeNameLast,
            response.employeeRoleId,
            response.employeeManagerId,
          ],
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Employee added!");
            init();
          }
        );
      });
  }

  //todo update department
  //todo update role
  //todo update employee role

  //delete a department
  if (capturedResponse === "Delete a department") {
    inquirer
      .prompt([
        {
          name: "deleteDept",
          message: "Which department number would you like to delete?",
          type: "input",
        },
      ])
      .then((response) => {
        const deleteDeptQuery = `DELETE FROM departments WHERE id = ?`;
        db.query(deleteDeptQuery, response.deleteDept, (err, result) => {
          if (err) throw err;
          console.table(result);
          console.log("Department deleted!");
          init();
        });
      });
  }

  //Delete a role
  if (capturedResponse === "Delete a role") {
    inquirer
      .prompt([
        {
          name: "deleteRole",
          message: "Which role number would you like to delete?",
          type: "input",
        },
      ])
      .then((response) => {
        const deleteRoleQuery = `DELETE FROM roles WHERE id = ?`;
        db.query(deleteRoleQuery, response.deleteRole, (err, result) => {
          if (err) throw err;
          console.table(result);
          console.log("Role deleted!");
          init();
        });
      });
  }
  if (capturedResponse === "Delete an employee") {
    inquirer
      .prompt([
        {
          name: "deleteEmployee",
          message: "Which employee would you like to delete? Use id number.",
          type: "input",
        },
      ])
      .then((response) => {
        const deleteEmployeeQuery = `DELETE FROM employee WHERE id = ?`;
        db.query(
          deleteEmployeeQuery,
          response.deleteEmployee,
          (err, result) => {
            if (err) throw err;
            console.table(result);
            console.log("Employee deleted!");
            init();
          }
        );
      });
  }
};
// IF "Update a department""Update a department"
// IF "Update a role""Update a role"
// IF "Update an employee""Update an employee"

//Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((responses) => {
      handleAnswer(responses.opener);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function call to initialize app
init();
