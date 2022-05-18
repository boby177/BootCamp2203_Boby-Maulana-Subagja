// const { query } = require("express");
const pool = require("./db");

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
        return subForum
    } catch (err) {
        console.log(err.message)
    }
}

// List Discussion
async function loadPost (req, res) {
    try{
        const {rows : listPost} = await pool.query(`SELECT ps.id_user, name, desc_post, title_post, date_post, id_post FROM users us JOIN discussion ps USING(id_user)`)
        return listPost
    } catch (err) {
        console.log(err.message)
    }
}

// List comments
async function loadComment (req, res) {
    try{
        const {rows : comment} = await pool.query(`SELECT * FROM comments`)
        return comment
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = { loadForum, loadSubForum, loadPost, loadComment }