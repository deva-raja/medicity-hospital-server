const messageRouter = require('./route/messageRouter');
const adminRouter = require('./route/adminRouter');
const doctorRouter = require('./route/doctorRouter');
const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { authMiddleWare } = require('./middleware/AuthmiddleWare');
const { urlencoded } = require('express');
path = require('path');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

// database connection
mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log('Listening to port 5000');
  })
  .catch((err) => console.log(err));


// routes
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.use('/auth',authMiddleWare);
app.use('/message', messageRouter);
app.use('/doctor',doctorRouter);
app.use('/admin',adminRouter);
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', authMiddleWare, (req, res) => res.render('smoothies'));
// app.use(AuthRouter);
