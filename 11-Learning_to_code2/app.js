const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000
const path = require('path');
const fs = require('fs');

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
const contacts = loadContact();

// Membuat sebuah variabel morgan dan memanggil 3rd party middleware dari morgan
var morgan = require('morgan')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

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
  res.render('index.ejs', {identity, contacts});
})

app.get('/about', (req, res) => {
  res.locals.title = 'About page'
  res.render('about.ejs')
  // next()
})

app.get('/contact', (req, res) => {
  res.locals.title = 'Contact page'
  res.render('contact.ejs')
})
  
  // Memanggil produk dan kategori ID
app.get('/product/:product_id', function(req, res) {
      const product_id = req.params.product_id;
      const category_query = req.query.category;
      
      res.send(
          'Product Id: ' + product_id +  
        '<br> Category: ' + category_query)
  })

// Menampilkan pesan error jika tidak ada page yang sesuai
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})