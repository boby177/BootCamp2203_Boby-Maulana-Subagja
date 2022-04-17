const express = require('express')
const app = express()
const { pool } = require('./dbConfig')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const {loadForum, loadSubForum, loadPost, detailPost, loadComment, deleteComment, deletePost } = require('./functions')
const logger = require('./logger')

const initializePassport = require('./passportConfig')
const req = require('express/lib/request')
initializePassport(passport)


const PORT = process.env.PORT || 4000;

// Express ejs layouts
var expressLayouts = require('express-ejs-layouts');
app.use(express.static('views'))
app.use(expressLayouts)
app.set('layout', './layout/main_layout.ejs')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Root page
app.get('/', (req,res) => {
    res.locals.title = 'Index page'
    res.render('index')
})

// Register page
app.get('/users/register', checkAuthenticated, (req,res) => {
    res.locals.title = 'Register page'
    res.render('register')
})

// Login page
app.get('/users/login', checkAuthenticated, (req,res) => {
    res.locals.title = 'Login page'
    res.render('login')
})

// Dashboard page
app.get('/users/dashboard', checkNotAuthenticated, (req,res) => {
    res.locals.title = 'Dashboard'
    res.render('dashboard', {user: req.user.name})
})

// Forum page
app.get('/forum', async (req,res) => {
    res.locals.title = 'Forum'
    const forum = await loadForum();
    res.render('forum/forum', {forum})
})

// Sub Forum page
app.get('/sub_forum', async (req,res) => {
    res.locals.title = 'Forum'
    const subForum = await loadSubForum();
    res.render('forum/sub_forum', {subForum})
})

// Sub Forum page detail
app.get('/sub_forum/:id', (req,res) => {
    try{
        const subForum = req.params.id
        const listSubForum = pool.query(`SELECT fr.id_forum, name_sub_forum, date_sub_forum, desc_sub_forum FROM forum fr JOIN sub_forum fm USING (id_forum) WHERE fr.id_forum = '${subForum}'`)
        console.log(listSubForum)
        // listSubForum.map(subForums =>{
        //     res.render('forum/sub_forum', {title: 'Sub Forum', listSubForum, subForums}) 
        // })
                res.render('forum/sub_forum', {title: 'Sub Forum', listSubForum})
    } catch (err) {
        console.log(err.message)
    }
})

// Discussion page
app.get('/discussion', async (req,res) => {
    res.locals.title = 'Discussion'
    const discussions = await loadPost();
    res.render('forum/discussion', {discussions})
})

// Add discussion page
app.get('/add_discussion', async (req,res) => {
    const forum = await loadForum();
    const subForum = await loadSubForum();
    res.locals.title = 'Add disscussion'
    res.render('forum/add_discussion', {forum, subForum})
})

// Add discussion process
app.post('/discussion', async (req,res) => {
    try{ 
        const {title, description, forum, sub_forum, date} = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO discussion (desc_post, title_post, id_forum, id_sub_forum, date_post) VALUES('${description}', '${title}', '${forum}, '${sub_forum}', '${date}'') RETURNING *`)
        res.redirect('/discussion')
    } catch (err) {
        console.log(err.message)
    }
})

// Detail discussion page
app.get('/detail_discussion/:id', detailPost)

// Comment page
app.get('/comment', async (req,res) => {
    res.locals.title = 'Comment'
    const comments = await loadComment();
    res.render('forum/comment', {comments})
})

// Add Comment Page
app.get('/add_comment', async (req,res) => {
    res.locals.title = 'Add Comment'
    res.render('forum/add_comment')
})

// Add Comment process
app.post('/comment', async (req,res) => {
    try {
        const {comment, date} = req.body
        res.locals.title = 'Comment'
        await pool.query(`INSERT INTO comments (desc_comment, date_comment) VALUES ('${comment}','${date}') RETURNING id_user`)
        res.redirect('/comment')
    } catch (err) {
        console.log(err.message)
    }
})

// Delete comment
app.get('/delete_comment/:id_comment', deleteComment)

// Delete discussion
app.get('/delete_discussion/:id_post', deletePost)

// Update comment page
app.get('/comment/update/:id', async (req,res) => {
    try{
        const comment = req.params.id
        console.log(req.params.id)
        const { rows : updateComment} = await pool.query(`SELECT * FROM comments where id_comment = '${comment}'`)
        updateComment.map(comments =>{
            res.render('forum/update_comment', {title: 'Update comment', updateComment, comments}) 
        })
    } catch (err) {
        console.log(err.message)
    }
})

// Update comment process
app.post('/comment/update', async (req,res) => {
    try {
        const id = req.params.id
        const comment = req.body
        await pool.query(`UPDATE comments (desc_comment) VALUES ('${comment}') WHERE id_comment = '${id}'`)
        res.redirect('/comment', {title: 'Comments'})
    } catch (err) {
        console.log(err.message)
    }
})

// Logout process
app.get('/users/logout', (req,res) => { 
    req.logOut()
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login')
})

// Login process
app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}))
// Register process
app.post('/users/register', async (req,res) => {
    res.locals.title = 'Register'
    let { name, email, password, password2} = req.body;

    console.log({
        name,
        email,
        password,
        password2
    })

    // Validation
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({message: 'Please enter all the fields'})
    }

    if(password.length < 8) {
        errors.push({message: 'Password must 8 characters'})
    }

    if(password != password2) {
        errors.push({message: 'Password does not match'})
    }

    if(errors.length > 0){
        res.render('register', {errors})
    } else {
        // Disguise the password
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, 
            [email], 
            (err, results) => {
                if(err){
                    throw err;
                }
                console.log(results.rows)
                if(results.rows.length > 0) {
                    errors.push({message: "This email already registered"})
                    res.render('register', {errors})
                } else {
                    pool.query(
                        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id_user, password', [name, email, hashedPassword], (err, results) =>{
                            if (err){
                                throw err
                            }
                            console.log(results.rows);
                            req.flash('success_msg', 'You are now registered, please login here.')
                            res.redirect('/users/login')
                        }
                    )
                }
            }
        )
    }
})

// Check if users login
function checkAuthenticated(req,res, next){
    if(req.isAuthenticated()){
        return res.redirect('/users/dashboard')
    }
    next()
}
// Check if users not login
function checkNotAuthenticated(req,res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login')
}

// Logger info
logger.error('error')
logger.warn('warn')
logger.info('info')
logger.debug('debug')
logger.silly('silly')

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})