import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';

import postsRouter from './routes/posts.js';

// TODO: Probably want to not set config stuff here; can do in an intermediary file that consumes config.json
const config = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));
const environment = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // needs to be above route specification below, or cors errors will be thrown

app.use('/posts', postsRouter);

// TODO: Probably want to not set config stuff here; can do in an intermediary file that consumes config.json
// can also get 'development' from env
const { mongoDBUsername, mongoDBPassword } = config[environment].mongoDB;

const CONNECTION_URL = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@cluster0.9lgbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.port || 5000;

// start database, then when successful start, start up Express app
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
