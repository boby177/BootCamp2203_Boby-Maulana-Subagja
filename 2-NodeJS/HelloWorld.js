// Menampilkan nama dalam sebuah variabel
const nama = "Boby Maulana Subagja";
const tampilNama = `Halo ${nama}, Terimakasih telah memilih penerbangan kami.`;
console.log(tampilNama);
console.log();

// Membuat readline untuk proses input dan output
const readline = require('readline');
const pertanyaan = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Daftar pertanyaan
console.log('=====> Welcome to Bob Air Flight <=====');
pertanyaan.question('Berapa banyak jumlah tiket yang dibeli: ', (tiket) => {
    pertanyaan.question('Dimanakah kota anda saat ini: ', (alamat) => {
        pertanyaan.question('Masukkan kota tujuan anda pergi: ', (tujuan) => {
            console.log();
            console.log(`Selamat datang ${nama}, jumlah tiket yang anda beli sebanyak ${tiket} tiket.`);
            console.log(`Anda saat ini berada di ${alamat}, dan berangkat pergi menuju kota ${tujuan}, selamat jalan !!!!`);
            pertanyaan.close();
        });
    });
}); 