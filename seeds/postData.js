const { Post } = require('../models');

const postdata =
[
  {
    "titlePost": "Coding 101",
    "postContent": "Coding can be tough.",
    "userId": 1
  },
  {
    "titlePost": "Biochemistry",
    "postContent": "The Kreb Cycle is important to know.",
    "userId": 2
  },
  {
    "titlePost": "Psychology",
    "postContent": "It is important to communicate.",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;