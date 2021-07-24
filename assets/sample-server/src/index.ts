import express from 'express';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  return res.sendFile(`${process.cwd()}/index.html`);
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
