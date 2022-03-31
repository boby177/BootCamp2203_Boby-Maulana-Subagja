const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

const identity = {
  name : 'Boby Maulana',
  judul : 'Web Server Node JS',
}

// information using ejs
app.set('view engine', 'ejs')
// Memanggil file main layout yang berisi header, nav, dan footer
app.set('layout', './layout/main_layout.ejs')

// information useing express layouts
app.use(expressLayouts);

app.get('/', (req,res)=>{
  cont = [
    {
      name:'Bob',
      email:'bob@bob.com'
    },
    {
      name:'Asep',
      email:'asep@bob.com'
    },
    {
      name:'Albert',
      email:'Albert@bob.com'
    }
  ]
  res.locals.title = 'Index page'
  res.render('index.ejs', {identity});
})

app.get('/about', (req, res) => {
  res.locals.title = 'About page'
  res.render('about.ejs')
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