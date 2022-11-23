const bcrypt = require('bcrypt');

function login(req,res) {
  if(req.session.loggedin != true) {
    res.render('login/index');
  }else{
    res.redirect('/');
  }
}

function auth(req,res) {
  const data = req.body;
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err,userdata) =>{
      if(userdata.length > 0) {
        userdata.forEach(element => {
          bcrypt.compare(data.password, element.password, (err,isMatch) => {
            if(!isMatch){
              res.render('login/index', {error: 'Contraseña incorrecta'});
            }else{
              req.session.loggedin = true;
              req.session.name = element.name;
              req.session.roles = element.roles;

              res.redirect('/');
            }
          });
        });
      }else{
        res.render('login/index', {error: 'El usuario no existe'});
      }
    });
  });
}

function register(req,res) {
  if(req.session.loggedin != true) {
    res.render('login/register');
  }else{
    res.redirect('/');
  } 
}

function storeUser(req,res) {
  const data = req.body;

  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err,userdata) =>{
      if(userdata.length > 0) {
        res.render('login/register', {error: 'El usuario ya existe'});
      }else{
        if(data.password == data.passwordConfirm){
          bcrypt.hash(data.password, 12).then(hash =>{
            data.password = hash;
            data.passwordConfirm = hash;
            req.getConnection((err, conn) => {
              conn.query('INSERT INTO users SET ?', [data], (err,rows) => {
                req.session.loggedin = true;
                req.session.name = data.name;
                req.session.roles = data.roles;
  
                res.redirect('/');
              });
            });
          });
        }else{
          res.render('login/register', {error: 'La contraseña no coincide'});
        }
      }
    });
  });
}

function logout(req,res) {
  if(req.session.loggedin == true) {
    req.session.destroy();
  }
  res.redirect('/login');
  
}


function open(req, res) {
  res.render('concertaciones/open');
}

function close(req, res) {
  res.render('concertaciones/close');
}

module.exports = {
  login: login,
  register: register,
  storeUser: storeUser,
  auth: auth,
  logout: logout,
  open:open,
  close:close,
}