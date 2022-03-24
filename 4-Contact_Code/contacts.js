const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membuat folder data apabila tidak ada
const dirPath = './data';
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// Membuat file contact.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]', 'utf-8');
}

// Fungsi untuk menampilkan pertanyaan
const questions = (ask) => {
    return new Promise((resolve, reject) => rl.question(ask, (inputVariable) => {
        resolve(inputVariable)
    }))
}

// Fungsi untuk mengambil isi data dari input, dan disimpan pada json file
const saveContact = (name, mobile, email) => {
    const contact = {name, mobile, email}
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Terimakasih telah memasukkan data!');
    rl.close();   
}

// exports setiap variabel yang digunakan pada file app
module.exports.questions = questions
module.exports.saveContact = saveContact