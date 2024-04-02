const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}); 
//(* will return the notes.html file ^ *)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//(* will return the index.html file^ *)

app.get('/api/notes', (req, res) => res.json(termData));

function createNote(body, noteArray) {
  const newNote = body;
  if (!Array.isArray(noteArray)) noteArray = [];

  if (noteArray.length === 0 )
  noteArray.push(0);

  body.id = noteArray[0];

  noteArray [0]++;

  noteArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(noteArray, null, 2)
);
return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNote(req.body, termData);
  res.json(newNote);
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
