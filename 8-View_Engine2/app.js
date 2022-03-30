const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const identity = {
  name : 'Boby Maulana',
  title : 'Web Server Node JS'
}

// information using ejs
app.set('view engine', 'ejs')

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
  res.render('index.ejs', {identity});
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

// app.get('/about', function(req, res) {
//     res.sendFile(path.join(__dirname, '/about.html'));
//   });

// app.get('/contact', function(req, res) {
//     res.sendFile(path.join(__dirname, '/contact.html'));
//   });
  
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