const fs = require('fs');
// const validator = require('./validator');

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

const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// Menambahkan data kontak yg telah diinput
const addData = (contact) => {
    const contacts = loadContact();
    contacts.push(contact)
    saveData(contacts)
}

// Menyimpan setiap data yang terkumpul pada file JSON 
const saveData = (contact) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contact));
    // console.log('Terimakasih telah memasukkan data!');
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
    return detailInformation;
    // if (detailInformation) {
    //     console.log(`\n1. ${detailInformation.name}\n2. ${detailInformation.email}\n3. ${detailInformation.mobile}`)
    // } else {
    //     console.log('Name is not found')
    // }
}

const duplicate = (name) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.name === name)
}

// Delete contact
const deleteContact = (name) => {
    const contacts = loadContact();
    // const contactName = {name};
    const contactsTemp = contacts.filter((contact) => contact.name !== name)
    saveContact(contactsTemp);
    // console.log(contactsTemp)
}

// update data contact
const updateContacts = (newContact) => {
    const contacts = loadContact();
    // menghilangkan kontak yg lama bernama sama
    const filteredContacts = contacts.filter((contact) => 
    contact.name !== newContact.oldName);
    // console.log(filteredContacts, newContact)
    delete newContact.oldName;
    filteredContacts.push(newContact);
    saveContact(filteredContacts);
}

// Delete multiple data
function deleteRow(name) {
    const contacts = loadContact();
     // const contactName = {name};
    const contactsTemp = contacts.filter((contact) => contact.name !== name)
}

// exports setiap variabel yang digunakan pada file app
module.exports = { deleteRow, updateContacts, duplicate, addData, saveContact, listContact, deleteContact, detailContact, loadContact}