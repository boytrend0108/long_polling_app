import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

const messages = [];
const emitter = new EventEmitter();
const app = express();

app.use(express.json());
app.use(cors());

app.post('/messages', (req, res) => {
  const { message } = req.body;

  messages.push(message);
  emitter.emit('message', message);
  res.status(201).send(messages);
});

app.get('/messages', (req, res) => {
  emitter.once('message', () => {
    res.status(200).send(messages);
  });
});

app.listen(3000, () => {
  console.log('Server run on http://localhost:3000');
});
