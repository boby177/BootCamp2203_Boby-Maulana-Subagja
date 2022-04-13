const fs = require('fs');
const { title } = require('process');
// const validator = require('./validator');
const pool = require('../db')

// Load data contact
async function loadContact (req,res) {
    try {
        const {rows : contact} = await pool.query(`SELECT * from contacts`)
        // res.json(contact.rows) // .rows melihat data yang ada pada rows
        return contact
    } catch (err) {
        console.error(err.message)
    }
}
// Detail contact
async function detailContact (req,res) {
    try{
        const detail = req.params.name
        const {rows : contacts} = await pool.query(`SELECT * from contacts WHERE name = '${detail}'`)
        contacts.map(contact => { // .map memasukan data pada sebuah variabel contactx
            res.render('detail.ejs', {title: 'Detail page',contacts, contact})
        })
    }catch (err) {
        console.error(err.message)
    }
}

// Delete contact
async function deleteContacts (req,res) {
    try{
        const del = req.params.name
        await pool.query(`DELETE from contacts WHERE name = '${del}'  `)
        res.redirect('/contact')
    }catch (err){
        console.error(err.message)
    }
}

// Delete contact checkbox
async function deleteContact (value) {
    try{
        // const del = req.params.name
        await pool.query(`DELETE from contacts WHERE name = '${value}'  `)
            // res.redirect('/contact')
    }catch (err){
        console.error(err.message)
    }
}

// Menambahkan data kontak yg telah diinput
async function addData (req,res) {
    try {
        const{rows : newCont}  = await pool.query(`INSERT INTO contacts VALUES
        ('${req.body.name}', '${req.body.mobile}', '${req.body.email}') RETURNING *`)
        // res.json(newCont)
        return newCont
    } catch (err) {
        console.error(err.message)
    }
}

const saveContact = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
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

const duplicate = (name) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.name === name)
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
module.exports = { deleteRow, updateContacts, duplicate, addData, saveContact, listContact, deleteContact, detailContact, loadContact, deleteContacts}