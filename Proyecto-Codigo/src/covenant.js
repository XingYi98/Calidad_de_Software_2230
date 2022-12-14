const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser')
const Handlebars = require('handlebars');
const loginRoutes = require('./routes/login');

const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
	extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'Proyecto22.',
    port: 3306,
    database: 'login_db'
   }));

   app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.listen(app.get('port'), () => {
 console.log('listening on port ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
  if(req.session.loggedin == true) {
    res.render('home', {name: req.session.name, roles: req.session.roles});
  }else{
    res.redirect('/login');
  }
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});