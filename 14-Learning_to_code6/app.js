const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs');
const {loadContact, detailContact, addData, duplicate, deleteContact} = require('./views/contacts')
const {body, check, validationResult } = require('express-validator')

// const session = require('express-session')
// const flash = require('express-flash')
// const cookieParser = require('cookie-parser')


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

// Membuat sebuah variabel morgan dan memanggil 3rd party middleware dari morgan
var morgan = require('morgan')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.use(express.urlencoded(true))

// Memanggil middleware morgan dengan format dev agar hasil output status token menjadi berwarna
app.use(morgan('dev'))

app.use(express.static('views'))

const identity = {
  name : 'Boby Maulana',
  judul : 'Web Server Node JS',
}

// information using ejs
app.set('view engine', 'ejs')
// Memanggil file main layout yang berisi header, nav, dan footer
app.set('layout', './layout/main_layout.ejs')

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// information useing express layouts
app.use(expressLayouts)

app.get('/', (req,res)=>{
  res.locals.title = 'Index page'
  const contacts = loadContact();
  res.render('index.ejs', {identity, contacts});
})

// Memanggil detail contact berdasarkan nama
app.get('/detail/:name', (req, res) => {
  res.locals.title = 'Detail page'
  const contact = detailContact(req.params.name);
  res.render('detail.ejs', {contact});
})

// Menghapus delete contact berdasarkan nama
app.get('/delete/:name', (req, res) => {
  res.locals.title = 'Contact page'
  deleteContact(req.params.name)
  const contacts = loadContact();
  res.render('contact.ejs', {contacts});
})

app.get('/about', (req, res) => {
  res.locals.title = 'About page'
  res.render('about.ejs')
})

app.get('/contact', (req, res) => {
  res.locals.title = 'Contact page'
  const contacts = loadContact();
  res.render('contact.ejs', {contacts}) 
})

app.get('/add_contact', (req, res) => {
  res.locals.title = 'Add contact form'
  res.render('add_contact.ejs')
})

app.post('/contact', [ 
    // Melakukan validasi cek name apabila terjadi duplicate
    body('name').custom((value) => { // body dipakai untuk custum validator
      const checkDuplicate = duplicate(value)
      // console.log(duplicate);
      // console.log(checkDuplicate)
      if(checkDuplicate){
          throw new Error ('Contact name is already recorded.');
      } else {
        return true
      } 
    }),
    // Validasi email dan mobile
    check('email', 'Email format is wrong.').isEmail(),
    check('mobile', 'Mobile phone number is wrong.').isMobilePhone(),
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.locals.title = ' Form page'
      res.render('add_contact', {
        errors: errors.array()
      })
    } else {
      // pop-up message
      addData(req.body)
      res.redirect('/contact')
    }
})

// Menampilkan pesan error jika tidak ada page yang sesuai
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})