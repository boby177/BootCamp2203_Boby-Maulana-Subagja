const contacts = require('./contacts');

// // Membuat list pertanyaan dan disimpan pada file JSON
// const main = async() => {
//         const name = await contacts.questions('What is your name: ');
//         const mobile = await contacts.questions('Your phone number: ');
//         const email = await contacts.questions('Your email: ');
        
//         contacts.saveContact(name, mobile, email);
// };

// main();

const yargs = require('yargs');

// command untuk menambahkan kontak baru
yargs.command({
        command: 'add',
        describe: 'add new contact',
        builder:{
                name:{
                        describe: 'contact name',
                        demandOption: true,
                        type: 'string',
                },
                email:{
                        describe: 'contact email',
                        demandOption: false,
                        type: 'string',
                },
                mobile:{
                        describe: 'contact mobile phone number',
                        demandOption: true,
                        type: 'string',
                },
        },
        handler(argv){
                const contact = {
                        name:argv.name,
                        email:argv.email,
                        mobile:argv.mobile,
                };
                console.log(contact);
                        // Menyimpan setiap data tersebut pada variabel saveContact dan disimpan pada JSON file 
                        contacts.saveContact(argv.name,argv.email,argv.mobile);
                        // console.log('Terimakasih telah memasukkan data!');
        },
});

// Command untuk menampilkan list kontak
yargs.command({
        command: 'list',
        describe: 'see contact list',
        handler(){
                contacts.listContact();
        },
});

// Command untuk menampilkan detail kontak
yargs.command({
        command: 'detail',
        describe: 'detail contact',
        handler(argv){
                contacts.detailContact(argv.name)
        },
});

// Command untuk menghapus kontak
yargs.command({
        command : 'delete',
        describe: "delete data ontact",
        builder: {
            name : {
                describe: 'Name Contact',
                demandOption: true,
                type : 'string',
            },
        },
        handler(argv) {
            contacts.deleteContact(argv.name);          
        },
    });

yargs.parse();