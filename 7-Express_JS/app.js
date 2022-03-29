const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// Memanggil file HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html')); // lokasi file
  });

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/about.html'));
  });

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, '/contact.html'));
  });
  
  // Memanggil produk dan kategori ID
app.get('/product/:product_id', function(req, res) {
      const product_id = req.params.product_id;
      const category_query = req.query.category;
      
      res.send(
          'Product Id: ' + product_id +  
        '<br> Category: ' + category_query)
  })

// Memanggil produk dan kategori ID
// app.get('/product/:product_id/category/:category_id', function(req, res) { // Cara memanggil id: http://localhost:3000/product/1/category/2
//       res.send('Product Id: ' + req.params.product_id + 
//                '<br> Category Id: ' + req.params.category_id)
//   });


// Menampilkan pesan error jika tidak ada page yang sesuai
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})