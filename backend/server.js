const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error during signup:", err);
            return res.status(500).json({ message: "An error occurred during signup" });
        }
        return res.status(200).json({ message: "Signup successful" });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ message: "An error occurred during login" });
        }

        if (data.length > 0) {
            return res.status(200).json({ message: "Success", user: data[0] });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
