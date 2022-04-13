// call expresss module
const express = require('express')
// call express library
const app = express()
// call database
const pool = require('./db')
// express js layout
var expressLayouts = require('express-ejs-layouts');
app.use(express.static('views'))
app.use(express.urlencoded(true))
// functions
const {loadContact, detailContact, deleteContact, deleteContacts} = require('./views/contacts')
const {body, check, validationResult } = require('express-validator')

app.use(express.json()) // => req.body
const port = 3000

// information using ejs
app.set('view engine', 'ejs')
// Connecting file main layout
app.set('layout', './layout/main_layout.ejs')
// information useing express layouts
app.use(expressLayouts)

// call server
app.listen(port, () => {
    console.log(`Example app on listening on port ${port} `)
})
// Index content
const identity = {
    name : 'Boby Maulana',
    judul : 'Web Server Node JS',
}

// Index page
app.get('/', (req,res)=>{
    res.locals.title = 'Index page'
    const contacts = loadContact();
    res.render('index.ejs', {identity, contacts});
})

// About page
app.get('/about', (req, res) => {
    res.locals.title = 'About page'
    res.render('about.ejs')
})

// Contact page
app.get('/contact', async (req, res) => {
    res.locals.title = 'Contact page'
    const contacts = await loadContact();
    res.render('contact.ejs', {contacts}) 
})

// Detail page
app.get('/detail/:name', detailContact)

// Delete page
app.get('/delete/:name', deleteContacts)

// Delete page using checkbox
app.post  ('/delete_checkbox', (req, res) => {
    const {checkbox} = req.body
    if (Array.isArray (checkbox)) {
      checkbox.forEach(dataSelected => {
        deleteContact(dataSelected);
        res.redirect('/contact') 
      });
    } else {
      deleteContact(checkbox);
      res.locals.title = 'Contact page'
      res.redirect('/contact')
    }
})

// Add contact page
app.get('/add_contact', (req, res) => {
    res.locals.title = 'Add contact form'
    res.render('add_contact.ejs')
})

// process add contact with validator
app.post('/contact', [ 
    // Melakukan validasi cek name apabila terjadi duplicate
    body('name').custom(async(value) => { // body dipakai untuk custum validator
        // const checkking = req.params.name
        const check_name = await pool.query(`SELECT * from contacts WHERE name = '${value}'`)
      if(check_name.rowCount > 0){
          throw new Error ('Contact name is already recorded.');
      } else {
        return true
      } 
    }),
    // Validasi email dan mobile
    check('email', 'Email format is wrong.').isEmail(),
    check('mobile', 'Mobile phone number is wrong.').isMobilePhone(),
], async (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body)
    if (!errors.isEmpty()) {
      res.locals.title = 'Form page'
      res.render('add_contact', {
        errors: errors.array()
      })
    } else {
        try {
        const {name, mobile , email} = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO contacts VALUES
         ('${name}', '${mobile}', '${email}') RETURNING *`)
        res.redirect('/contact')
    } catch (err) {
        console.error(err.message)
    }}
})


// Update contact page
app.get('/contact/update/:name', async (req,res) => {
    try{
        const update = req.params.name
        const {rows : update_cont} = await pool.query(`SELECT * from contacts WHERE name = '${update}'`)
        update_cont.map(contact => { 
            res.render('update.ejs',{
                title: 'update page',
                update_cont, contact
            })
        })
    }catch (err){
        console.error(err.message)
    }
})

// Update contact process
app.post('/contact/update', [ 
    // Melakukan validasi cek name apabila terjadi duplicate
    body('name').custom(async(value) => { // body dipakai untuk custum validator
        // const checkking = req.params.name
        const check_name = await pool.query(`SELECT * from contacts WHERE name = '${value}'`)
      if(check_name.rowCount > 0){
          throw new Error ('Contact name is already recorded.');
      } else {
        return true
      } 
    }),
    // Validasi email dan mobile
    check('email', 'Email format is wrong.').isEmail(),
    check('mobile', 'Mobile phone number is wrong.').isMobilePhone(),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.locals.title = 'Form update page'
      res.render('update', {
        errors: errors.array(),
        contact: req.body,
      })
    } else {
        try{
            const {oldName, name, email , mobile} = req.body
            await pool.query(`UPDATE contacts 
            SET name='${name}', mobile='${mobile}', email='${email}'
            WHERE name = '${oldName}'`)
            res.locals.title = 'Form update page'
            res.redirect('/contact')
        }catch (err){
            console.error(err.message)
        }}
  })

// Page not found
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})