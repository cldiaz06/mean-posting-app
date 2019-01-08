const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect(
  "mongodb+srv://meanStack:kbWDk6IAcnkvNoT1@meanstarter-aegcr.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
      console.log('Connected to DB');
  })
  .catch(() => {
      console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                 "Origin, X-Request-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next)=> {
  const post = new Post({
      title: req.body.title,
      content: req.body.content
  }); //req.body;
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'post added successfully!'
  });
});

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {id:'lakfjdsjf',
     title: 'first server-side post',
     content:'This is coming from backend server.'
    },
    {
      id: 'esfdadv',
      title: 'second server-side post',
      content: 'This is coming from backend server as well!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });

});

module.exports = app;
