const mysql = require('mysql2');
const { getRandomUser } = require('./functions');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); aapp.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// Connect sql bunch with nodejs 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test", // mysql database nameyoutu
    password: "" // my sql root password
});

// this query used for show tables inside student database
// let q = "SHOW TABLES";
// Via Placeholder where there is ? the static values in query replace with user array

// inserting new data into table user
// for single user
let q1 = "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
let user = ["123", "123_newuser", "abc@gmail.com", "abc"];

// for multiple user
let q2 = "INSERT INTO user (id,username,email,password) VALUES ?";
let users = [["213", "213_newuser", "bac@gmail.com", "bac"], ["321", "321_newuser", "cba@gmail.com", "cba"]];

// for dynamic data in bulk
let data = [];
for (let i = 0; i <= 100; i++) {
    data.push(getRandomUser()); // 100 random fake users 
}
console.log(data)
let q3 = "INSERT INTO user (id,username,email,password) VALUES ?"
try {
    connection.query(q1, user, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err)
}
try {
    connection.query(q2, [users], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
} catch (err) {
    console.log(err)
}
try {
    connection.query(q3, [data], (err, result) => {
        if (err) throw err;
        console.log(result);
        // console.log(result.length);
        // console.log(result[0]);
        // console.log(result[1]);
    });
} catch (err) {
    console.log(err)
}
connection.end();

//  GET/ Fetch & show total number of users on our app
app.get("/", (req, res) => {
    let q4 = "SELECT Count(*) FROM user";
    try {
        connection.query(q4, (err, result) => {
            if (err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs", { count });
        });
    } catch (err) {
        res.send("some error occurred");
        console.log(err)
    }
})
//  GET/user Fetch & show (id,username,email) of all users
app.get("/users", (req, res) => {
    let q5 = "SELECT * FROM user";
    try {
        connection.query(q5, (err, users) => {
            if (err) throw err;
            console.log(users);
            res.render("users.ejs", { users });
        });
    } catch (err) {
        res.send("some error occurred");
        console.log(err)
    }
})
// GET/user/:id/edit to get form to edit the username ,based on id 
// this form will require a password
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q5 = `SELECT * FROM user WHERE id='${id}' `;
    console.log(id)
    try {
        connection.query(q5, (err, result) => {
            if (err) throw err;
            let user = result[0];
            console.log(user);
            res.render("edit.ejs", { user });
        });
    } catch (err) {
        res.send("some error occurred");
        console.log(err)
    }
})
// PATCH/user/:id To edit username, if correct password was entered in form
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let q5 = `SELECT * FROM user WHERE id='${id}' `;
    let { password: formPass, username: newUsername } = req.body;
    console.log(id)
    try {
        connection.query(q5, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPass != user.password) {
                res.send("Wrong Password");
            } else {
                let q6 = `UPDATE user SET username='${newUsername}' WHERE id ='${id}'`
                connection.query(q6, (err, result) => {
                    if (err) throw err;
                    res.redirect("/users");
                })
            }
            res.render("edit.ejs", { user });
        });
    } catch (err) {
        res.send("some error occurred");
        console.log(err)
    }
})

// Homework tasks

// Create Form to Add a new user to the Database
// Create Form to delete a user from Database if they enter correct email,id & password.

// type this command in terminal to access mysql in from CLI

// /usr/local/mysql/bin/mysql -u root -p
// Enter Password and use it 
const PORT = "8080";
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})