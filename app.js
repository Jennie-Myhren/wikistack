const express = require('express');
const morgan = require('morgan');
const main = require('./views/main');
const { db, Page } = require('./models');
const userRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/users', userRouter);
app.use('/wiki', wikiRouter);

app.get('/', async (req, res) => {
  const posts = await Page.findAll();
  res.send(main(posts));
});

async function dbSync() {
  await db.sync();

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log('Server running on : ' + PORT);
  });
}

dbSync();
