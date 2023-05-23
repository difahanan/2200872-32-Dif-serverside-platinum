const express = require('express');
const app = express();
const { user_games, user_game_biodata, sequelize, Sequelize } = require('./models');
const user_game = require('./models/user_game');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.get('/rock-paper-scissors', (req, res) => {
  res.sendFile(__dirname + '/public/html/games.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

app.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;

    const userData = await user_games.findOne({
      where: { userID: id, password },
    });

    if (!userData) {
      return res.status(404).send('ID/password salah');
    }

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/html/signup.html');
});

app.get('/profile', async (req, res) => {
  try {
    const userData = await user_games.findAll({ include: [user_game_biodata] });

    res.render('profile', { user: userData });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
});


//DETAILS
app.get('/profile/details', async (req, res) => {
  try {
    const userData = await user_games.findAll({ include: [user_game_biodata] });

    res.render('profile', { user: userData });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error!');
  }
});

// ADD DATA
app.get('/profile/add', function (req, res) {
  res.render('addprofile.ejs');
});

app.post('/profile/add', async function (req, res) {
  try {
    const { id, username, asal, email, password, ...sisa } = req.body;
    const transaction = await sequelize.transaction();

    const userData = await user_games.create(
      { userID: id, username, asal, email, password },
      { transaction }
    );
    await user_game_biodata.create({ ...sisa, userID: userData.id }, { transaction });
    await transaction.commit();
    res.redirect('/profile');
  } catch (error) {
    console.log('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


//UPDATE
app.get('/profile/update/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const userData = await user_games.findOne({
      where: { id },
      attributes: [
        'id',
        'userID',
        'password',
        'username',
        Sequelize.col('"user_game_biodata"."email"'),
        Sequelize.col('"user_game_biodata"."asal"'),
      ],
      include: [
        {
          model: user_game_biodata,
        },
      ],
    });
    if (!userData) {
      return res.status(404).send('User not found');
    }
    res.render('userupdate', { user: userData });
  } catch (error) {
    console.log('Internal Server Error:', error);
    res.status(500).send('Internal Server Error');

    app.post('/profile/update/:id', async function (req, res) {
      try {
        const { id, username, asal, email, password, ...sisa } = req.body;
        const transaction = await sequelize.transaction();
    
        const userData = await user_games.create(
          { userID: id, username, asal, email, password },
          { transaction }
        );
        await user_game_biodata.create({ ...sisa, userID: userData.id }, { transaction });
        await transaction.commit();
        res.redirect('/profile');
      } catch (error) {
        console.log('Internal Server Error:', error);
        res.status(500).send('Internal Server Error');
      }
    });
  }
});

//DELETE
  app.post('profile/delete', async function(req, res) {
    try{
      const id = req.query.id
      await userData.destroy({ where : {id}, transaction});
      // await user_game_biodata.destroy({ where : {id}, transaction});
      await transaction.commit();
      res.redirect('/profile');
    }catch(error) {
      await transaction.rollback();
      console.log(error)
      res.status(500).send('Internal server error')
    }})


// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log('Internal Server Error:', err.message);
  res.send(err.message || 'Internal Server Error');
});

app.listen(process.env.PORT, () => {
  console.log(`server berjalan pada port ${process.env.PORT}`);
});
