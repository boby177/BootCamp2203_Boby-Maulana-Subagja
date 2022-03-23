// core modules
// file system
const fs = require('fs');

// Menuliskan kata2 dan otomatis membuat file test.txt
// fs.writeFileSync('test.txt', 'Hello World secara Synchronous bla bla!');

// fs.readFile('test.txt', 'utf-8', (err,data) => {
//     if(err) throw err;
//     console.log(data);
// });

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name: ', (name) => {
    rl.question('Your mobile phone number: ', (mobile) => {
        rl.question('Input your email: ', (email) => {
            console.log(`Thankyou ${name}, your mobile phone number is ${mobile}, and email is ${email}`);
            rl.close();
        });    
    });    
});