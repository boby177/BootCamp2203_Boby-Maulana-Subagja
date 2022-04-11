// call expresss module
const express = require('express')
// call express library
const app = express()
// call database
const pool = require('./db')

app.use(express.json()) // => req.body
const port = 3000

// call server
app.listen(port, () => {
    console.log(`Example app on listening on port ${port} `)
})

// Insert data to database
app.get('/addasync', async (req,res) => {
    try {
        const name = "Asep"
        const mobile = "0891248"
        const email = "asep@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts VALUES
        ('${name}', '${mobile}', '${email}') RETURNING *`)
        res.json(newCont)
    } catch (err) {
        console.error(err.message)
    }
})
// List data contacts
app.get('/list', async (req,res) => {
    try {
        const contact = await pool.query(`SELECT * from contacts`)
        res.json(contact.rows) // .rows melihat data yang ada pada rows
    } catch (err) {
        console.error(err.message)
    }
})
// Detail data contacts
app.get('/detail/:name', async (req,res) => {
    try{
        const detail = req.params.name
        const detail_Cont = await pool.query(`SELECT * from contacts WHERE name = '${detail}'  `)
        res.json(detail_Cont.rows)
    }catch {
        console.error(err.message)
    }
})
// Delete data contacts
app.get('/delete/:name', async (req,res) => {
    try{
        const del = req.params.name
        const delete_Cont = await pool.query(`DELETE from contacts WHERE name = '${del}'  `)
        // res.json(delete_Cont)
        res.send(`Contact has been deleted`)
        // res.redirect('/list')
    }catch (err){
        console.error(err.message)
    }
})
// Update data contacts
app.get('/update/:name', async (req,res) => {
    try{
        const update = req.params.name
        const update_cont = await pool.query(`UPDATE contacts 
        SET name='Satria', mobile='3213123', email='arisris@gmail.com'
        WHERE name = '${update}'  `)
        // res.json(update_Cont)
        res.send(`Contact '${update}' has been updated`)
    }catch (err){
        console.error(err.message)
    }
})