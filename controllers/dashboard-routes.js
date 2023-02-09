const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// get request for all posts for the dashboard
router.get('/', withAuth, async (req, res) => {
  try {

    const postingData = await Post.findAll({
      where:{"userId": req.session.userId},
      include: [User]
    });
    // makes sure the data acquired is true
    const allposts = postingData.map((post) => post.get({ plain: true }));
console.log(allposts);

    res.render('all-posts', {
      // laying out as dashboard as opposed to the main
      layout: 'dashboard',
      posts: allposts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// creating get request after making a new post
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// editing the post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postingData = await Post.findByPk(req.params.id);

    if (postingData) {
      // data serilization
      const allposts = postingData.get({ plain: true });
      console.log(allposts);
      res.render('edit-post', {
        layout: 'dashboard',
        post: allposts,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
