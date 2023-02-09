const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// get request for posts on the homepage
router.get('/', async (req, res) => {
  try {
    const postingData = await Post.findAll({
      include: [User],
    });
    // serialize the data
    const allposts = postingData.map((post) => post.get({ plain: true }));
    res.render('all-posts-admin', { posts: allposts, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// get request for a single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postingData = await Post.findOne({
      where: {id: req.params.id},
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postingData) {
      // data serilization
      const allposts = postingData.get({ plain: true });
      console.log(allposts);
      res.render('single-post', { post: allposts, loggedIn: req.session.loggedIn});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get request for login and signup
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
