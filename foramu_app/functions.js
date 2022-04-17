const { query } = require("express");
const { pool } = require("./dbConfig");

// List forum function
async function loadForum (req, res) {
    try{
        const {rows : listForum} = await pool.query(`SELECT * FROM forum`)
        return listForum
    } catch (err) {
        console.log(err.message)
    }
}
// List sub forum function
async function loadSubForum (req, res) {
    try{
        const {rows : subForum} = await pool.query(`SELECT * FROM sub_forum`)
        // console.log(subForum)
        return subForum
    } catch (err) {
        console.log(err.message)
    }
}
// async function loadSubForum (req, res) {
//     try{
//         const subForum = req.params.id
//         const {rows : listSubForum} = await pool.query(`SELECT fr.id_forum, name_sub_forum, date_sub_forum, desc_sub_forum FROM forum fr JOIN sub_forum fm USING (id_forum) WHERE fr.id_forum = '${subForum}'`)
//         listSubForum.map(subForums =>{
//             res.render('forum/sub_forum', {title: 'Sub Forum', listSubForum, subForums}) 
//         })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

// List Discussion
async function loadPost (req, res) {
    try{
        const {rows : listPost} = await pool.query(`SELECT ps.id_user, name, desc_post, title_post, date_post, id_post FROM users us JOIN discussion ps USING(id_user)`)
        // console.log(listPost)
        return listPost
        // listPost.map(discussions =>{
        //     res.render('forum/discussion', {title: 'Discussion', listPost, discussions}) 
        //     console.log(discussions)
        // })
    } catch (err) {
        console.log(err.message)
    }
}
// List detail discussion
async function detailPost (req, res) {
    try{
        const id = req.params.id
        const {rows : post} = await pool.query(`SELECT * FROM discussion WHERE id_post = '${id}'`)
        post.map(posts =>{
                res.render('forum/detail_discussion', {title: 'Discussion', post, posts}) 
                // console.log(discussions)
            })
    } catch (err) {
        console.log(err.message)
    }
}
// List comments
async function loadComment (req, res) {
    try{
        const {rows : comment} = await pool.query(`SELECT * FROM comments`)
        return comment
        // comment.map(comments =>{
        //         res.render('forum/comment', {title: 'Discussion', comment, comments}) 
        //         console.log(comment)
        //         // console.log(discussions)
        //     })
    } catch (err) {
        console.log(err.message)
    }
}
// Delete comment
async function deleteComment (req,res) {
    try {
        // const del = req.param.id
        // console.log(del)
        await pool.query(`DELETE from comments WHERE id_comment = '${req.param.id}'`)
        res.redirect('/comment')
    } catch (err) {
        console.log(err.message)
    }
}
// Delete discussion
async function deletePost (req,res) {
    try {
        // const del = req.param.id
        // console.log(del)
        await pool.query(`DELETE from discussion WHERE id_post = '${req.param.id}'`)
        res.redirect('/comment')
    } catch (err) {
        console.log(err.message)
    }
}
module.exports = { loadForum, loadSubForum, loadPost, detailPost, loadComment, deleteComment, deletePost }