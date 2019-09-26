const router = require('express').Router();
const { addPage } = require('../views'); //TODO : ASK ABOUT THIS
const { Page } = require('../models');

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content,
  });

  try {
    await page.save();
    console.log(page);
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

router.get('/:slug', async (req, res, next) => {
  //find slug
  const slug = await Page.findAll({
    where: {
      slug: req.params.slug,
    },
  });
  console.log(slug);
  ///view

  res.send('hello world :)');
});

module.exports = router;
