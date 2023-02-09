const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
 try{ 
  const dataComments = await Comment.findAll({
    include: [User],
  });

// serialize the data
  const everycomment = dataComments.map((comment) => comment.get({ plain: true }));

  console.log(everycomment);
  //rendering single-post handlebar
  res.render('single-post', {comments: everycomment, loggedIn: req.session.loggedIn});
} catch(err) {
    res.status(500).json(err);
}
});

// posting the comment
router.post('/', withAuth, async (req, res) => {
  const bodies = req.body;

  try {
    const commentNew = await Comment.create({
      ...bodies,
      userId: req.session.userId,
    });
    res.json(commentNew);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
