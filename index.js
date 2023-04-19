const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?",
    },
    {
        type: "input",
        name: "title",
        message: "what is your project's name?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a short description of your project:"
    },
    {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },
    {
        type: "input",
        name: "install",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
    {
        type: "input",
        name: "test",
        message: "What command should be run to run tests?",
        default: "npm test"
    },
    {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?",

    },
    {
        type: "input",
        name: "contribution",
        message: "What does the user need to know about contributing to the repo?"
    }
]).then((response) => {
    console.log(response);
    let markdown = formatFile(response);
    fs.writeFile("generated/README.md", markdown, function (err) {
        if (err) {
            throw err;
        }
        console.log("Generating README...");
    })
}).catch((error) => {
    console.error(error);
})

function formatFile(data) {
    let { username, email, title, description, license, install, test, usage, contribution } = data;
    let licenseURL = license.split(" ").join("%20");

    let formattedMarkdown = `# ${title} 
![badge](https://img.shields.io/badge/license-${licenseURL}-blue)
## Description
${description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Credits](#credits)
* [License](#license)

## Installation
${install}
    
## Usage 
${usage}

## Tests
${test}
    
## Contributing
${contribution}

## Questions
If you have any questions, please send them my way!
You can reach me on GitHub ([${username}](https://github.com/${username}/)) or by email ([${email}](${email})).

## License
${license}`

    return formattedMarkdown;
}