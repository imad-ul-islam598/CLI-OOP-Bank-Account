#! /usr/bin/env node

import inquirer from "inquirer"
console.log("\n ---- Welcome To Our Mini My Bank OOP(Object Oriented Programming) ---- \n");

// Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    
// Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} Successful. Remaining Balance: $${this.balance}`);
    }else {
        console.log("Insufficient Balance.");
    }
}

// Credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} Successful. Remaining Balance: $${this.balance}`);

}

// Check balance
checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
}
}

// Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

// Create customers
const customers: Customer[] = [
    new Customer ("Ausaf", "Khan", "Male", 35, 3162223334, accounts[0]),
    new Customer ("Afaq", "Khan", "Male", 24, 3332223334, accounts[1]),
    new Customer ("Ayesha", "Khan", "Female", 35, 3412223334, accounts[2])
]

// Function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Withdraw:"
                        })
                        customer.account.withdraw(withdrawAmount.amount);
                        break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank You For Using Our Bank Services. Have A Great Day!");
                    return;
            }
            
        }else {
            console.log("Invalid Account Number. Please Try Again.");
        }
    } while(true)
}

service();
console.log("\n ---- Thanks For Testing Our Project ---- \n");

