const express = require('express')
const mysql = require('mysql')

const router = express.Router();
router.get('/messages', (req, res) => {
    console.log('A new form of messages from a different route...')
    res.end();
})


//obtain all users
router.get('/users', (req, res) => {
    console.log('fetching users with');
    const conn = getConnection();
    // const userId = req.params.id;
    const state = `SELECT * FROM users`;
    conn.query(state, (err, rows, fields) => {
        if (err) {
            console.log('There was an error connecting to server: ' + err);
            res.sendStatus(500);
            res.end();
        }
        console.log("Wow, it has become fun to program!");
        const users = rows.map((row) => {
            return { id: row.id, firstname: row.firstname, secondname: row.lastname };
        })

        res.json(users)
    });

    // res.end();
})

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejssql'
})

//function getConnection
function getConnection() {
    return pool;
    
}

// getting a single user to display

router.get('/user/:id', (req, res) => {
    console.log('Fetching a sigle user.....');
    const conn = getConnection();
    const userId = req.params.id;
    const state = `SELECT * FROM users WHERE id=?`
    conn.query(state, [userId], (err, results) => {
        if (err) {
            console.log('Could not obtain User: ' + err);
            res.sendStatus(500);
            res.end();
        }
        console.log(results);
        res.json(results);
    });

})

//Posting to database table
router.post('/user_create', (req, res) => {
    console.log("I think it can connect....");
    console.log("First Name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;

    const queryString = "INSERT INTO users (firstname, lastname) VALUES (?, ?)";
    getConnection().query(queryString, [firstName, lastName], (err, results, field) => {
        if (err) {
            console.log("Failed to insert new user: " + err);
            res.sendStatus(500);
            return
        };
        console.log("Inserted user with Id: " + results.insertId);
        res.end();

    })
    res.end();

});

module.exports = router;