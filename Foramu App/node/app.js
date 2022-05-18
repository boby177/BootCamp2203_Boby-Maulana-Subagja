const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const multer = require('multer')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const port = 3001
const authorization = require('./middleware/authorization')
const validInfo = require("./middleware/validInfo");


// List other functions
const { loadForum, loadSubForum, loadPost, loadComment } = require('./otherFunctions')

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'image')))
// Express ejs layouts
// app.use(express.static('views'))
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.set('layout', './layout/main_layout.ejs')

// Upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./image/upload");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage });

// Upload Image Route
// app.post('/api/upload', upload.single('photo'), async (req,res) => {
//     // Save into database
//     let finalImageURL =  req.protocol + "://" + req.get("host") + "/upload/" + req.file.filename;
//     await pool.query(`INSERT INTO img (img) VALUES 
//         ('${finalImageURL}') RETURNING *`)
//         res.redirect('/profile')
//         // res.redirect('/forum')
//     res.json({status: 'succcess', image: finalImageURL})
// })

// Upload Image User
// app.post('/api/upload', authorization, validInfo, upload.single('photo'), async (req,res) => {
app.post('/api/upload', upload.single('photo'), async (req,res) => {
    // Save into database
    let finalImageURL =  req.protocol + "://" + req.get("host") + "/upload/" + req.file.filename;
    await pool.query(`UPDATE users SET user_img = '${finalImageURL}' WHERE user_name = 'wgs'`)
    // await pool.query(`UPDATE users SET user_img = '${finalImageURL}' WHERE user_id = $1`, [req.user.id])
        res.redirect('/profile')
    res.json({status: 'succcess', image: finalImageURL})
})

// Upload Image Discussion
app.post('/api/upload/discussion/:id', upload.single('photo'), async (req,res) => {
    const id = req.params.id
    let finalImageURL =  req.protocol + "://" + req.get("host") + "/upload/" + req.file.filename;
    const image = await pool.query(`UPDATE discussion SET img_post = '${finalImageURL}' WHERE id_post = ${id}`)
    // await pool.query(`UPDATE users SET user_img = '${finalImageURL}' WHERE user_id = $1`, [req.user.id])
        res.redirect('/discussion')
    res.json(image)
})

// GET Image Route
app.get('/api/image', async (req, res) => {
    // const id = 2;
    let image = await pool.query(`SELECT * FROM img `)
    console.log(image.rows)
    res.json(image.rows)
    // res.send(image)
})

// Register and Login Route
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'))

// Home Page
app.get('/', (req,res) => {
    res.locals.title = 'Index page'
    res.render('./index')
})

// Users
app.get('/users', async (req, res) => {
    try{
        const {rows : users} = await pool.query(`SELECT user_name, user_email, user_img FROM users`)
        res.json(users)
    } catch (err) {
        console.log(err.message)
    }
})

// Forum page
app.get('/forum', async (req,res) => {
    try {
        const {rows : forum} = await pool.query(`SELECT * FROM forum`)
        res.json(forum)
    } catch (err) {
        console.error(err.message)
    }
})

// List detail forum
app.get('/forum/:id', async (req, res) => {
    try{
        const id = req.params.id
        const {rows : forum} = await pool.query(`SELECT * FROM forum WHERE id_forum = '${id}'`)
        res.json(forum)
    } catch (err) {
        console.log(err.message)
    }
})

// Create Main Forum
app.post('/forum/add_forum', async (req, res) => {
    try {
        const {newName, newDesc} = req.body
        // console.log(req.body)
        await pool.query(`INSERT INTO forum (name_forum, desc_forum) VALUES 
        ('${newName}', '${newDesc}') RETURNING *`)
        res.redirect('/forum')
    } catch (error) {
        console.error(error.message)
    }
})

// Delete Main Forum
app.delete('/forum/delete_forum/:id', async (req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        await pool.query(`DELETE FROM forum WHERE id_forum = ${id}`)
        res.redirect('/forum')
    } catch (error) {
        console.error(error.message)
    }
})

// Update Main Forum
app.put('/forum/update/:id', async (req, res) => {
    const id = req.params.id
    const {updateName, updateDesc} = req.body
    console.log(req.body)
    await pool.query(`UPDATE forum SET name_forum='${updateName}', desc_forum='${updateDesc}' WHERE id_forum = ${id}`)
    res.redirect('/forum')
})

// Sub Forum page
app.get('/sub_forum', async (req,res) => {
    try {
        const sub_forum = await loadSubForum();
        res.json(sub_forum)
    } catch (err) {
        console.error(err.message)
    }
})

// Delete Sub Forum
app.delete('/sub_forum/delete_forum/:id', async (req, res) => {
    try {
        const id = req.params.id
        await pool.query(`DELETE FROM sub_forum WHERE id_sub_forum = ${id}`)
        res.redirect('/sub_forum')
    } catch (error) {
        console.error(error.message)
    }
})

// Create Sub Forum
app.post('/sub_forum/add_forum', async (req, res) => {
    try {
        // const forum = await loadForum();
        const {newName, newDesc, idForum} = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO sub_forum (name_sub_forum, desc_sub_forum, id_forum) VALUES 
        ('${newName}', '${newDesc}', ${idForum}) RETURNING *`)
        res.redirect('/sub_forum')
        // res.render('/sub_forum')
    } catch (error) {
        console.error(error.message)
    }
})

// Sub forum detail page
app.get('/sub_forum/detail/:id', async (req,res) => {
    try{
        const id = req.params.id
        console.log(id)
        const {rows : listSubForum} = await pool.query(`SELECT fr.id_forum, name_forum, name_sub_forum, date_sub_forum, desc_sub_forum FROM forum fr INNER JOIN sub_forum fm USING (id_forum) WHERE fr.id_forum = '${id}'`)
        res.json(listSubForum)
    } catch (err) {
        console.log(err.message)
    }
})

// Update Sub Forum
app.put('/sub_forum/update/:id', async (req, res) => {
    const id = req.params.id
    const {updateName, updateDesc} = req.body
    console.log(req.body)
    await pool.query(`UPDATE sub_forum SET name_sub_forum='${updateName}', desc_sub_forum='${updateDesc}'
    WHERE id_sub_forum = ${id}`)
    res.redirect('/sub_forum')
})

// Discussion page
app.get('/discussion', async (req,res) => {
    try{
        // const {rows : listPost} = await pool.query(`SELECT ps.user_id, user_name, desc_post, title_post, date_post, id_post FROM users us JOIN discussion ps USING(user_id)`)
        const {rows : listPost} = await pool.query(`SELECT * FROM discussion`)
        res.json(listPost)
    } catch (err) {
        console.log(err.message)
    }
})

// List detail each discussion
app.get('/discussion/detail/:id', async (req, res) => {
    try{
        const id = req.params.id
        const {rows : post} = await pool.query(`SELECT * FROM discussion WHERE id_post = '${id}'`)
        res.json(post)
    } catch (err) {
        console.log(err.message)
    }
})

// List Discussion based on sub forum 
app.get('/discussions/detail/:id', async (req,res) => {
    try{
        const id = req.params.id
        console.log(id)
        const {rows : listDiscussion} = await pool.query(`SELECT sf.id_sub_forum, name_sub_forum, title_post, date_post, desc_post, img_post FROM sub_forum sf INNER JOIN discussion ds USING (id_sub_forum) WHERE sf.id_sub_forum = '${id}'`)
        res.json(listDiscussion)
    } catch (err) {
        console.log(err.message)
    }
})

// Create Discussion
app.post('/discussion/add_discussion', async (req, res) => {
    try {
        const {newTitle, newDesc, idForum, idSubForum} = req.body
        const {rows : discussion} = await pool.query(`INSERT INTO discussion ( title_post, id_forum, id_sub_forum, desc_post) VALUES
        ('${newTitle}', ${idForum}, ${idSubForum}, '${newDesc}') RETURNING *`)
        res.json(discussion)
        res.redirect('/discussion')
    } catch (error) {
        console.error(error.message)
    }
})

// Update Discussion
app.put('/discussion/update/:id', async (req, res) => {
    const id = req.params.id
    const {updateTitle, updateDesc} = req.body
    console.log(req.body)
    await pool.query(`UPDATE discussion SET title_post ='${updateTitle}', desc_post = '${updateDesc}' WHERE id_post = ${id}`)
    res.redirect('/discussion')
})

// Delete discussion
app.delete('/discussion/delete_discussion/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        await pool.query(`DELETE FROM discussion WHERE id_post = ${id}`)
        res.redirect('/discussion//detail/:id')
    } catch (error) {
        console.error(error.message)
    }
})

// Comment page
app.get('/comment', async (req,res) => {
    try {
        // const {rows : listComment} = await pool.query(`SELECT ps.user_id, user_name, desc_comment, date_comment, id_comment FROM users us JOIN comments ps USING(user_id)`)
        const {rows : listComment} = await pool.query(`SELECT * FROM comments`)
        res.json(listComment)
    } catch (err) {
        console.error(err.message)
    }
})

// Add comment
app.post('/comment/add_comment', async (req, res) => {
    try {
        const { newDesc } = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO comments (desc_comment) VALUES 
        ('${newDesc}') RETURNING *`)
        res.redirect('/discussion//detail/:id')
    } catch (error) {
        console.error(error.message)
    }
})

// Delete comment
app.delete('/comment/delete_comment/:id', async (req, res) => {
    try {
        const id = req.params.id
        await pool.query(`DELETE FROM comments WHERE id_comment = ${id}`)
        res.redirect('/discussion//detail/:id')
    } catch (error) {
        console.error(error.message)
    }
})

// Port
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// Page not found
app.use('/',(req,res) => {
    res.status(404)
    res.send('page not found 404')
})