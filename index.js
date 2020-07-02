const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const keys = require('./config/keys');
const compression = require('compression');
const helmet = require('helmet');

app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));
app.use(compression());
app.use(helmet());


app.get('/', (req, res) => {
  res.render('index');
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: keys.GMAIL_USER,
      pass: keys.GMAIL_PASS
    }
  })
  const mailOpts = {
    from: req.body.email,
    to: keys.GMAIL_USER,
    subject: 'PortFolio',
    text: `Heyy Utkrisht, I am ${req.body.name} (${req.body.email}) this side ,just go through your Portfolio and wanna say: ${req.body.message}`
  }
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('blog') // Show a page indicating failure
    }
    else {
      res.render('kunal') // Show a page indicating success
    }
  })
});

app.get('/email/sent', (req, res) => {
  res.render('emailMessage');
});

app.get('/gallery', (req, res) => {
  res.render('gallery');
});



app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});



app.get('/about', (req, res) => {
  res.render('about');
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at port ${port}`));
