const express = require('express')
const app = express()
const pool = require('./db')
app.use(express.json())
const port = 3001
var cors = require('cors')

app.use(cors())

// List contacts
app.get('/contacts', async (req, res)=>{
    try {
        const {rows : contact} = await pool.query(`SELECT * from contacts`)
        // console.log(contact)
        res.json(contact)
    } catch (err) {
        console.error(err.message)
    }
})
// Detail contacts
app.get('/contacts/:name', async (req, res)=>{
    try {
        const {rows : contact} = await pool.query(`SELECT * from contacts where name = '${req.params.name}'`)
        // console.log(contact)
        res.json(contact)
    } catch (err) {
        console.error(err.message)
    }
})
// Delete contact
app.delete('/contact/:id', async (req, res)=>{
    try{
        const id = req.params.id
        await pool.query(`DELETE from contacts WHERE id = ${id}`)
        res.send('Data has been deleted')
        res.redirect('/contacts')
    }catch (err){
        console.error(err.message)
    }
})
// Add contact
app.post('/add_contact', async (req, res) => {
    try {
        const {newName, newEmail , newMobile} = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO contacts (name, email, mobile) VALUES
         ('${newName}', '${newEmail}', '${newMobile}') RETURNING *`)
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }
})
// Update contact
app.put('/contact/:id', async (req,res) => {
    try{
        const id = req.params.id
        const {updateName, updateEmail , updateMobile} = req.body
        await pool.query(`UPDATE contacts 
        SET name='${updateName}', email='${updateEmail}', mobile='${updateMobile}'
        WHERE id = '${id}'`)
        res.locals.title = 'Form update page'
        res.redirect('/contacts')
    }catch (err){
        console.error(err.message)
    }
})

// Port
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

// Page not found
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})