const fs = require('fs');
const http = require('http');

const panggilFile = (path, res) => {
    fs.readFile(path, 'utf8', function(err, data){
        // jika terjadi error tidak menemukan file
        if(err){
            res.writeHead(404);
            res.write('<h1>Page not found</h1>');
        }
        else{
            res.write(data);
        }
        res.end(); // untuk mengakhiri response 
    });
}

http
    .createServer((req,res) => { // request & resource
        const url = req.url; // url yang telah di input oleh user akan dimasukan pada console
        console.log(url);
        
        // Memanggil List file URL
        if(url === '/about'){
            panggilFile('./about.html', res);
        } 
        else if(url === '/contact') {
            panggilFile('./contact.html', res)
        } 
        else {
            panggilFile('./index.html', res)
        }

        res.writeHead(200, { // 200 = status code dari network
            'Content-Type': 'text/html'
        });
    })

    .listen(3000,() => { // Menjalankan di port 3000 | port dari default server atau port yang kosong
        console.log('Server is listening on port 3000');
    });