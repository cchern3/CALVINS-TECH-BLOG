const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// CREATE POST
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const createPostnew = await Post.create({ ...body, userId: req.session.userId });
    console.log("Your new post: ",  createPostnew);
    res.json(createPostnew);
     } catch (err) {
       console.log('You have an error!', err);
    res.status(500).json(err);
  }
});

// Updating the post
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('This is the req.body', req.body);
    const [chosenRow] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (chosenRow > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deleting the post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
