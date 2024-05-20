import { config } from 'dotenv';
import express from 'express';

const app = express();
config({ path: "../.env" });

app.get('/', (req, res) =>
{
  res.send('Hello World!');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port localhost:${process.env.SERVER_PORT}`)
});