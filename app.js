const express = require('express');
const morgan = require('morgan');
const main = require('./views/main');
const { db } = require('./models');
const userRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/users', userRouter);
app.use('/wiki', wikiRouter);



app.get('/', (req, res) => {
  console.log('hello world :)');
  res.send(main('hello world 2'));
});




// db.authenticate().then(() => {
//   console.log('connected to the database');
// });

async function dbSync() {
  await db.sync({ force: true });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log('Server running on : ' + PORT);
  });
}

dbSync();
