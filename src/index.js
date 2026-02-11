const express = require('express');
const createClient = require('redis');
const { Client } = require('pg'); 


const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_Port = 27017;
const DB_Host = '172.18.0.2';
const URI = process.env.MONGO_URI || `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_Host}:${DB_Port}`;
mongoose.connect(URI)
  .then(() => console.log('Connected to MongoDB............'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const redisClient = createClient.createClient({
  url: "redis://redisByMarwa:6379",
})
redisClient.on("error", (err) => console.log("Redis Client Error", err))
  redisClient.on("connect", () => console.log("Connected to Rclearedis..."))
  redisClient.connect();


app.get('/', (req, res) => {
  redisClient.set('keyByMarwa', 'Value from Redis By Marwa');
  res.send('Hello World! Hii agaain updated by Marwa Mehanna 1  from dev branch to AWS');
});

app.get('/data', async(req, res) => {
  var data = await redisClient.get('keyByMarwa');
  res.send('datafrom redist is: ' + data);
});

/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

const pgClient = new Client({
  user: 'userexample',
  password: 'example',
  host: 'postgressdbByMarwa',
  port: 5432,
  database: 'postgres', // Use default postgres database
})


pgClient.connect()
  .then(async () => {
    console.log('Connected to Postgres...');
    return console.log(await pgClient.query('SELECT NOW()'));
  })
  .catch(err => console.error('Could not connect to Postgres...', err));

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});
 