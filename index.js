// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const { setFlagsFromString } = require("v8");

///// QUESTIONS/////

const questions = await inquirer.prompt([
  //What would you like to do?
  {
    type: "list",
    name: "opener",
    message: "What would you like to do?",
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
      "View indiviual employee",
      "Add an employee",
      "Update an employee",
      "Delete an employee",
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
]);

// IF "View all departments""View all departments"
// IF "View individual department""View individual department"
// IF "Add a department""Add a department"
// IF "Update a department""Update a department"
// IF "Delete a department""Delete a department"
// IF "View all roles""View all roles"
// IF "View individual role""View individual role"
// IF "Add a role""Add a role"
// IF "Update a role""Update a role"
// IF "Delete a role""Delete a role"
// IF "View all employees""View all employees"
// IF "View indiviual employee""View indiviual employee"
// IF "Add an employee""Add an employee"
// IF "Update an employee""Update an employee"
// IF "Delete an employee""Delete an employee"

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (error) => {
    if (error) console.log(error);
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const README = generateMarkdown(answers);
      writeToFile("./dist/README.md", README);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function call to initialize app
init();
