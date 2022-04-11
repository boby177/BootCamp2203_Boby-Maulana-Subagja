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
        const name = "Aris"
        const mobile = "08124124"
        const email = "aris@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts VALUES
        ('${name}', '${mobile}', '${email}') RETURNING *`)
        res.json(newCont)
    } catch (err) {
        console.error(err.message)
    }
})
// Menampilkan data pada table contacts
app.get('/list', async (req,res) => {
    try {
        const contact = await pool.query(`SELECT * from contacts`)
        res.json(contact.rows) // .rows melihat data yang ada pada rows
    } catch (err) {
        console.error(err.message)
    }
})
// Menampilkan detail berdasarkan nama contacts
app.get('/detail/:name', async (req,res) => {
    try{
        const detail = req.params.name
        const detail_Cont = await pool.query(`SELECT * from contacts WHERE name = '${detail}'  `)
        res.json(detail_Cont.rows)
    }catch {
        console.error(err.message)
    }
})
// Menghapus data pada contacts berdasarkan nama
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