#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do ?\n",
        choices: [
            {
                name: `Visit my ${chalk.magenta.bold("Portfolio")} ?`,
                value: async () => {
                    await open("https://pacifiquem.engineer");
                    console.log("\nDone, have a nice view .\n");
                }
            },
            {
                name: `Send me an ${chalk.green.bold("email")} ?`,
                value: async () => {
                    await open("mailto:pacifiquemurangwa001@gmail.com");
                    console.log("\nDone, see you soon at inbox .\n");
                }
            },
            {
                name: `Download my ${chalk.yellowBright.bold("Resume")} ?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://drive.google.com/u/0/uc?id=1YzkaDfJZ2Fe2eHEhpoysbBjrdvm1nhRD&export=download').pipe(fs.createWriteStream('./pacifiquem.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'pacifiquem.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath);
                        loader.stop();
                    });
                }
            },
            {
                name: `Schedule a ${chalk.red.bold("Meeting")} ?`,
                value: async () => {
                    await open('https://calendly.com/pacifiquemurangwa001');
                    console.log("\n See you at the meeting . \n");
                }
            },
            {
                name: "Just quit. ",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("Murangwa Pacifique"),
    handle: chalk.white("@pacifiquem"),
    work: `${chalk.white("Backend Engineer")} ${chalk
        .hex("#2b82b2")
        .bold("Golang || C/C++ || NodeJS || NestJS || SpringBoot")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("_pacifiquem"),
    github: chalk.gray("https://github.com/") + chalk.green("pacifiquem"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("pacifiquem"),
    web: chalk.cyan("https://pacifiquem.engineer/"),
    npx: chalk.red("npx") + " " + chalk.white("pacifiquem"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you !"
        )}`
    ].join("\n"),
    {
        margin: '1 auto',
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action()).catch(err => {
    console.log(chalk.bgCyan.magenta.bold("Something went wrong . Try again later . \n \n"));
    console.log(err);
});
