
import ejs from 'ejs'
import http from 'http'
import fs from 'fs'
import dayjs from 'dayjs'

import { students } from './data/data.js'

dayjs.locale('fr')

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
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



            const template = fs.readFileSync('views/users.ejs', 'utf8');
            const rendered = ejs.render(template, { students, dayjs });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(rendered);
            res.end();


            break;

        case '/assets/css/style.css':
            const cssFile = fs.readFileSync('assets/css/style.css', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(cssFile);
            res.end();
            break;

        case '/addUser':

            console.log('j ajoute un user')

            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const formData = new URLSearchParams(body);
                const name = formData.get('name');
                const birthdate = formData.get('birthdate');

                students.push({ name: name, birth: birthdate })

                // alert('Utilisateur ' + name + 'ajouté !')

                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
            break;
    }
});

server.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000');
});