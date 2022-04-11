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
        const name = "Jay"
        const mobile = "08124124"
        const email = "jay@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts VALUES
        ('${name}', '${mobile}', '${email}') RETURNING *`)
        res.json(newCont)
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/list', async (req,res) => {
    try {
        const contact = await pool.query(`SELECT * from contacts`)
        res.json(contact.rows) // .rows melihat data yang ada pada rows
    } catch (err) {
        console.error(err.message)
    }
})

app.get('/detail/:name', async (req,res) => {
    try{
        const detail = req.params.name
        const detail_Cont = await pool.query(`SELECT * from contacts WHERE name = '${detail}'  `)
        res.json(detail_Cont.rows)
    }catch {
        console.error(err.message)
    }
})