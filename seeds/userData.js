const { User } = require('../models');

const userdata =
[
  {
    "username": "Alex",
    "password": "password"
  },
  {
    "username": "Bob",
    "password": "password"
  },
  {
    "username": "Laura",
    "password": "password"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;

