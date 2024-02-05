const Manager = require("./starter/lib/Manager.js");
const Engineer = require("./starter/lib/Engineer.js");
const Intern = require("./starter/lib/Intern.js");
const inquirer = require("inquirer");
//const path = require("path");
const fs = require("fs");

//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./starter/src/page-template.js");

//creating array team for collecting inputted information
let team=[]

//constants to include employee questions
const managerQ = [
    {
        type: 'input',
        message: "Manager's name",
        name: 'name',
    },
    {
        type: 'input',
        message: "email",
        name: 'email',
    },
    
    {
        type: 'input',
        message: "employee ID",
        name: 'id',
    },
    {
        type: 'input',
        message: "Office number",
        name: 'officeNumber',
    },
];

const engineerQ = [
    {
        type: 'input',
        message: "employee's name",
        name: 'name',
    },
    {
        type: 'input',
        message: "email",
        name: 'email',
    },
    
    {
        type: 'input',
        message: "employee ID",
        name: 'id',
    },
    {
        type: 'input',
        message: "Github username",
        name: 'github',
    },
];

const internQ = [
    {
        type: 'input',
        message: "employee's name",
        name: 'name',
    },
    {
        type: 'input',
        message: "email",
        name: 'email',
    },
    
    {
        type: 'input',
        message: "employee ID",
        name: 'id',
    },
    {
        type: 'input',
        message: "School",
        name: 'school',
    },
]

//function to generate additional employees
function nextEmployee (){
    
    inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'role',
                message: "choose next employee's role",
                choices: ['engineer', 'intern','Finish building the team?'],
            },
        ])
        .then(roleChoice => {
            
                if (roleChoice.role ==='engineer'){
                    inquirer
                        .prompt(engineerQ)
                        .then(engineerAns =>{
                            let engineer = new Engineer(engineerAns.name, engineerAns.id, engineerAns.email, engineerAns.github);
                            team.push(engineer);
                            nextEmployee();
                            return team
                        })
                }else if (roleChoice.role ==='intern'){
                    inquirer
                        .prompt(internQ)
                        .then(internAns =>{
                            let intern = new Intern (internAns.name, internAns.id, internAns.email, internAns.school);
                            team.push(intern);
                            nextEmployee();
                            return team
                        })
                } else {
                writeFileFun();
                }; 
        })
}

//function to write the final html file
function writeFileFun(){
    fs.writeFile('output/team.html', render(team),'utf-8',(error) => {
        return error
        ?console.log(error)
        :console.log ('')
        })
    return team
}

//initialising the process
function init(){
inquirer
    .prompt( managerQ)
    .then(answers => {

            let manager = new Manager(answers.name, answers.id, answers.email,answers.officeNumber);
            team.push(manager);
            nextEmployee();
        }) 
};
init();   

