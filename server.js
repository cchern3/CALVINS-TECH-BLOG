const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'its a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`App listening on port ${process.env.PORT || 3001}!`);
  sequelize.sync({ force: false });
});

