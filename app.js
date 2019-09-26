const express = require('express');
const morgan = require('morgan');
const main = require('./views/main')


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    console.log("hello world :)")
    res.send(main("hello world 2"))
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server runing on : " + PORT);
})

