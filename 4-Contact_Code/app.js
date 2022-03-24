// const fs = require('fs');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Membuat folder data apabila tidak ada
// const dirPath = './data';
// if (!fs.existsSync(dirPath)){
//     fs.mkdirSync(dirPath);
// }

// // Membuat file contact.json jika belum ada
// const dataPath = './data/contacts.json';
// if(!fs.existsSync(dataPath)){
//     fs.writeFileSync(dataPath,'[]', 'utf-8');
// }

// const questions = (ask) => {
//     return new Promise((resolve, reject) => rl.question(ask, (inputVariable) => {
//         resolve(inputVariable)
//     }))
// }

const contacts = require('./contacts');

// Membuat list pertanyaan dan disimpan pada file JSON
const main = async() => {
        const name = await contacts.questions('What is your name: ');
        const mobile = await contacts.questions('Your phone number: ');
        const email = await contacts.questions('Your email: ');
        
        contacts.saveContact(name, mobile, email);
                // const file = fs.readFileSync('data/contacts.json', 'utf-8');
                // const contacts = JSON.parse(file);
                // contacts.push(contact);
                // fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
                // console.log('Terimakasih telah memasukkan data!');
                // rl.close();
            // });
        // });
    // });
};

main();