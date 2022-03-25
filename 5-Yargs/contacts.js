const fs = require('fs');
const validator = require('./validator');

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

// Fungsi untuk mengambil isi data dari input, dan disimpan pada json file
const saveContact = (name, email,mobile) => {
    const contact = {name, email, mobile}
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    // Melakukan validasi cek name apabila terjadi duplicate
    const duplicateName = contacts.find((contact) => contact.name === name);
    if(duplicateName){
        console.log('Contact name is already recorded. Use another contact name.');
        return false;
    }

    // Melakukan validasi email
    if(email != "" && !validator.isEmail(email)) {
        console.log('Email yang anda masukan salah');
        return false;
    }

    // Melakukan validasi cek mobile number apabila terjadi duplicate
    if(!validator.isMobilePhone(mobile)) {
        console.log('This mobile number is wrong, try again!');
        return false;
    }

    // Menyimpan setiap data yang terkumpul pada file JSON 
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Terimakasih telah memasukkan data!');
}

// exports setiap variabel yang digunakan pada file app
module.exports = {saveContact}