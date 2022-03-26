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

// Load data contact
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
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

    // // Melakukan validasi email
    if(email) {
        if(!validator.isEmail(email)) {
        console.log('Email yang anda masukan salah');
        return false;
        }
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

// List contact
const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List: ');
    contacts.forEach((contact, i) =>{
        console.log(`${i+1}.${contact.name} - ${contact.mobile}`);
    });
};

// Detail contact
const detailContact = (name) => {
    const contacts = loadContact();
    contactName = { name }
    const detailInformation = contacts.find((contactName) => contactName.name === name)
    if (detailInformation) {
        console.log(`\n1. ${detailInformation.name}\n2. ${detailInformation.email}\n3. ${detailInformation.mobile}`)
    } else {
        console.log('Name is not found')
    }
}

// Delete contact
const deleteContact = (name) => {
    const contacts = loadContact();
    const contactName = {name};
    const contactsTemp = contacts.filter((contactName) => contactName.name !== name)
    // console.log(contactsTemp)
    if (contacts.length === contactsTemp.length) {
        console.log('Cannot found the contact, try again');
        return false
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(contactsTemp));
    console.log('Contact has been deleted');
}

// exports setiap variabel yang digunakan pada file app
module.exports = {saveContact, listContact, deleteContact, detailContact}