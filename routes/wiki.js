const router = require('express').Router();
const { addPage } = require('../views'); //TODO : ASK ABOUT THIS
const { Page } = require('../models');

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
    // slug: slug
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/', (req, res) => {
  console.log('hello world :)');
  res.redirect('../');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
