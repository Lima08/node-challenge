const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const config = {
    host: 'db',
    password: 'root',
    user: 'root',
    database: 'users',
};

const PORT = 3000;
const connection = mysql.createConnection(config);

const getNames = 'SELECT name FROM `people`';
const insertName = (name) => `INSERT INTO \`people\` (name) VALUES ("${name}")`;

const header = '<h1>Full Cycle Rocks!</h1>';
const message = (nameList) => `
    ${header}
    <ul>
        ${nameList
            .map((name, index) => `<li>${name} - ${index + 1}</li>`)
            .join('')}
    <ul/>
`;

function createListName(err, people) {
    if (err) {
        return console.error(err);
    }

    return people.map(({ name }) => name);
}

app.use(cors());
app.get('/', (_, res) => {
    connection.query(insertName('Usuário'), (error, result) => {
        connection.query(getNames, (err, people) => {
            const nameList = createListName(err, people);
            res.send(message(nameList));
        });
    });
});

app.listen(PORT, () => console.log(`Server running - PORT:${PORT}`));
