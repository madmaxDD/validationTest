const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('form', { errors: null });
});

app.post('/submit', [
  check('imie').isLength({ min: 2 }).withMessage('Imię musi zawierać co najmniej 2 znaki.'),
  check('wiek').custom(value => {
    if (isNaN(value) || value < 18) {
      throw new Error('Musisz mieć co najmniej 18 lat.');
    }
    return true;
  }),
  check('email').isEmail().withMessage('Niepoprawny adres email.'),
], (req, res) => {
  const { imie, wiek, email } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('form', {
      errors: errors.array(),
      imie: req.body.imie,
      wiek: req.body.wiek,
      email: req.body.email,
    });
  }

  res.render('results', { imie, wiek, email });
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
