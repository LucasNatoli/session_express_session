const express = require('express')
const session = require('express-session')
const SQLiteStore = require('connect-sqlite3')(session)

const app = express()
const PORT = 3000

app.use(session({
  store: new SQLiteStore({dir: 'dbs', db: 'sess.db'}),
  secret: 'DuM0R4z0r',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}))

app.get('/', (req, res) => {
  res.send('Live and Direct');
})
app.get('/start-session', (req, res) => {
  var sess = req.session
  sess.valor = 1
  sess.save((err) => {
    if (err) {
      res.send("No se puede grabar la session")
      console.log("error grabando session: ", err);
    } else {
      res.send("Grabada session ok - " + sess.id)
      console.log('id de session', sess.id);
    }
  })
})

app.get('/check-session', (req, res) => {
  var sess = req.session
  if (sess) {
    console.log('check session: ', sess.valor);
    res.send('Session valor:' + sess.valor)
  } else {
    console.log('no hay session');
    res.send('No hay session')
  }
})

app.get('/logout', (req, res) => {
  var sess = req.session
  var id = sess.sessionId
  if (sess) {
    sess.destroy()
    console.log('session destroyed: ', id)
  } else {
    console.log('no hay session que destruir');
  }
  res.send('session destroyed')
})
app.listen(PORT, () => {
  console.log('Raz0r listening on port:', PORT)
})
