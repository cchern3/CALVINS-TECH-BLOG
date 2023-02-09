const router = require('express').Router();
const { User } = require('../../models');

// creating the sign up api

router.post('/', async (req, res) => {
  try {
    const brandnewUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.userId = brandnewUser.id;
      req.session.username = brandnewUser.username;
      req.session.loggedIn = true;

      res.json(brandnewUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// post request for the logging in

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'There is no user by that name!' });
      return;
    }

    const correctPassword = user.checkPassword(req.body.password);

    if (!correctPassword) {
      res.status(400).json({ message: 'The account could not be found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'The account could not be found!' });
  }
});

// post request for logging out

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
