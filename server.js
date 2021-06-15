const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs');

async function readJSON(path){
    const data = await fs.promises.readFile(path)
    .catch(err => console.error('Chyba načtení souboru: ', err));
    return JSON.parse(data.toString());
}

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/events', (req, res) => {
    readJSON('/data/historie.json')
    .then(data => res.send(data))
    .catch(err => res.send('Chyba lávky', err));
});

app.get('/api/events', (req, res) => {
    readJSON('data/map.json')
    .then(data => res.send(data))
    .catch(err => res.send('Chyba lávky', err));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));