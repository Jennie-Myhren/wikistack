const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: Sequelize.ENUM('open', 'closed'),
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
      unique: true,
    },
  },
});

Page.beforeValidate(userInstance => {
  userInstance.slug = userInstance.title
    .replace(/[^a-zA-Z0-9-' ']/g, '')
    .replace(' ', '_');
});

//   db.Page.beforeValidate(pages => {
//     let slug = pages.title.replace(/[^a-zA-Z0-9-' ']/g, '').replace(' ', '_');
//     pages.slug = slug;

module.exports = {
  db,
  Page,
  User,
};
