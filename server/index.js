import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/posts.js';

const app = express();

app.use('/posts', postRouter);

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// DO NOT LEAVE HERE LATER
const mongoDBUsername = 'broxsonl';
const mongoDBPassword = 'Fishy5136';

const CONNECTION_URL = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.9lgbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
