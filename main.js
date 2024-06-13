#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 25000;
let myPin = 2233;
// Print welcome message
console.log(chalk.blue("\n \tWelcome to XYZ Bank - ATM\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Please enter your pin: ")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, Login Successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Please select an operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Please select withdrawl method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Please select amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.magentaBright(`${fastCashAns.fastCash} Withdraw Successfully `));
                console.log(chalk.magenta(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.magentaBright(`${amountAns.amount} Withdraw Successfully`));
                console.log(chalk.magenta(`Your remaining balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.blueBright(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
