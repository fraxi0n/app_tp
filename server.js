const fs = require('fs');
const dayJS = require('dayjs')
const ejs = require('ejs');
const http = require('http')
const { parse } = require("querystring");

app.post('/add-user', (req, res) => {
    // Get the form data from the request body
    const { name, birthdate } = req.body;
    // Parse the birthdate into a Date object using Day.js
    const dateObj = dayjs(birthdate, 'YYYY-MM-DD').toDate();
    // Add the new user to the list
    userList.push({ name, birth: dateObj });
    // Send a success response
    res.sendStatus(200);
});

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            // Return the form to add a user
            res.writeHead(200, { 'Content-Type': 'text/html' });
            ejs.renderFile('./views/home.ejs', {}, {}, (err, str) => {
                if (err) {
                    console.error(err);
                    res.end('An error occurred');
                } else {
                    res.end(str);
                }
            });
            break;
        case '/users':
            ejs.renderFile('./views/users.ejs', {}, {}, (err, str) => {
                if (err) {
                    console.error(err);
                    res.end('An error occurred');
                } else {
                    res.end(str);
                }
            });

            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write();
            // res.end();
            break;
    }
});

server.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000');
});