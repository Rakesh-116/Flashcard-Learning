// server/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rakesh@123',
  database: 'flashcards'
});

db.connect();

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      res.json({ error: 'Failed to retrieve flashcards' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM flashcards WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.json({ error: 'Failed to retrieve flashcard' });
      return;
    }
    if (results.length === 0) {
      res.json({ error: 'Flashcard not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err) => {
    if (err) {
      res.json({ error: 'Failed to add flashcard' });
      return;
    }
    res.json({ success: true });
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) {
      res.json({ error: 'Failed to delete flashcard' });
      return;
    }
    res.json({ success: true });
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) {
      res.json({ error: 'Failed to update flashcard' });
      return;
    }
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
