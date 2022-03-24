const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Input nama
checkName();
function checkName() {
    rl.question('What is your name: ', (name) => {

// Input Mobile Number
    checkMobile();
    function checkMobile() {
        validator.isMobilePhone, rl.question('Your number: ', (mobile) => {
            if (!validator.isMobilePhone (mobile)) {
                console.log('This mobile number is wrong, try again!');
                console.log();
                checkMobile();
            } else {
                checkEmail();
            }

// Input nama
        checkEmail();
        function checkEmail() {
            validator.isEmail, rl.question('Your email: ', (email) => {
                if (!validator.isEmail (email)) {
                    console.log('This email is wrong, try again!');
                    console.log();
                    checkEmail();
                } else {
                    console.log();
                    console.log(`Thankyou, your name is ${name}, your phone number ${mobile}, and your email ${email}`);
                    rl.close();
                }
        })};
    })};
})};