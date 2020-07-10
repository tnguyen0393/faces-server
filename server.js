const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('It is working!!!');
});

app.post('/signin', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(`App is running on port ${process.env.PORT}`);
});
