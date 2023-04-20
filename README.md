# README.md Generator

## Description

This week's project is pretty straightfoward.  I'm just dipping my toe into the waters of Node.js, with an eye toward more complex projects further down the line.  My plan this week is to just make a simple README generator.

| **Scenario**                                                                                                                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _When I run index.js, I'll be prompted to provide content for various categories in a typical README. Upon completion, the application will generate a README file that contains the information I provided._ |

I'm going to use `inquirer` to run the prompts, so that should give me the chance to practice installing a package with `npm i`. I'll use the native `fs` module to write to file. I'm also generally looking forward to getting more familiar with using the command line.

---

## Here it is in action

![README Genetrator](images/app-in-use.gif)

## My Approach

### Setting up the Prompt

After tooling around a bit in the `inquirer` documentation, it was pretty simple to set up the prompts. They generally all fall into the default use case: displaying a message and receiving a typed input.  I only deviated from that in two instances, included here:

```javascript
    {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    }
```
>The "list" type accepts an optional "choices" array of possible answer that the user then selects by using the arrow keys.
```javascript 
    {
        type: "input",
        name: "install",
        message: "What command should be run to install dependencies?",
        default: "npm i"
    },
```
>The "input" type accepts a "default" option, so I tried that out here.

---

### Handling the Response

Again, no real surprises after reading the docs. Once the user completes the questionnaire, `inquirer` returns the responses in an object. Then it's just a matter of dropping those responses into the appropriate place in a template literal.

```javascript
function formatFile(response) {
    let { username, email, title, description, license, install, test, usage, contribution } = data;

    let formattedMarkdown = `
    # ${title} 

    ## Description
    ${description}

    ## Installation
    ${install}

    // ... and so on ...
`}
```

The only remarkable bit came up when I decided to include a license badge from [shields.io](https://shields.io). Several of the user-selectable licenses contains spaces as written, so I had to deal with that before including it in the badge url.

I couldn't figure out if `inquirer` had some native method for handling this kind of thing, but I didn't look very hard. It was easy to handle on my end with a split/join combo.

```javascript
let licenseURL = license.split(" ").join("%20");

`![badge](https://img.shields.io/badge/license-${licenseURL}-blue)`
```

---
## Usage

* Install the `inquirer` package using `npm i`.
* Run `node index.js`.
* Answer the questions when prompted. 
* Review the README that is written to the "generated" directory.
* Repeat as needed.
>Note: as written, the application will overwrite the generated README each time it runs. 

---
## Learnings / Reflections

Again, not too much here, but an exciting little peek at what's possible!

A few thoughts I have for going forward:

* Including a giant template literal directly in the `index.js` file seems like it _can't_ be the best way to do this.  I'd rather set it up in a separate file as, well, a __template__, where it wouldn't crowd the rest of the code. 
* I could set up a few templates and then allow the user to choose.
* `inquirer` is fine, but the command line interface isn't a great environment for collecting much text from a user.
    * The CLI is not a good text editor, and the part I find time consuming about making READMEs isn't the part where I create the headings, so this particular tool won't really speed up my workflow.
    * If I created a more robust template structure, I can see how it would get _more_ useful as a generator, but in that case, I'd want to cut down on the number of prompts, i.e. spend less time on the CLI and produce an editable document more quickly.