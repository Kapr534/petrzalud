const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const usersFile = path.join(__dirname, 'users.txt');

// Helper function to read users from the file
const readUsers = () => {
    if (!fs.existsSync(usersFile)) {
        return {};
    }
    const data = fs.readFileSync(usersFile, 'utf8');
    return data ? JSON.parse(data) : {};
};

// Helper function to write users to the file
const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users[username]) {
        res.json({ success: false, message: 'Uživatelské jméno již existuje.' });
    } else {
        users[username] = { password };
        writeUsers(users);
        res.json({ success: true });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    if (users[username] && users[username].password === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Špatné uživatelské jméno nebo heslo.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
