var express = require('express');
var router = express.Router();
var passport = require('passport');

var SECRET_KEY = 'SECRETBOND';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


var mongoose = require('mongoose');

require('../models/Posts');
require('../models/Comments');
require('../models/Users');
require('../models/Physicians');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Physician = mongoose.model('Physician');

var jwt = require('express-jwt');

/*A middleware for authenticating jwt tokens
* Would require authentication for actions
* Properties:-   userPropery option specifies which property on req to put our payload from our tokens
*                secret key
*/
var auth = jwt({secret: SECRET_KEY, userProperty: 'payload'});

/*
* PHYSICIANS routes
* GET  /physicians - return a list of physicians and associated metadata
* GET /physicians/:id - return an individual physician
*/
router.get('/physicians', function(req, res, next) {
  Physician.find(function(err, physicians){
    if(err) { return next(err); }

    res.json(physicians);
  });
});


/*
* POST :- Route for Blog Posts & Articles
* Handled various different routes for this feature
* GET /posts - return a list of posts and associated metadata
* POST /posts - create a new post
* GET /posts/:id - return an individual post with associated comments
* PUT /posts/:id/upvote - upvote a post, notice we use the post ID in the URL
* POST /posts/:id/comments - add a new comment to a post by ID
* PUT /posts/:id/comments/:id/upvote - upvote a comment
*/
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

router.put('/posts/:post/upvote', auth, function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

/*
* POST /posts/:id/comments - add a new comment to a post by ID
* PUT /posts/:id/comments/:id/upvote - upvote a comment
*/

router.post('/posts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function(err, comment) {
    if(err) { return next(err); }

    if (!comment) { return next(new Error('can\'t find post')); }

    req.comment = comment;
    return next();
  });
});


router.get('/posts/:post/comments/:comment', function(req, res) {
  res.json(req.comment);
});

router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) { return next(err); }

    res.json(comment);
  });
});


/*Register new users & return a JWT token
* User could be either a patient or a Doctor
* Store into different schema (Doctor or User) based on 'type' which could be either patient or doctor
*/
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

/*login endpoint to authenticate our users & return a JWT token
*/
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

    passport.authenticate('user-local', function(err, user, info){
      if(err){ return next(err); }

      if(user){
        return res.json({token: user.generateJWT()});
      } else {
        return res.status(401).json(info);
      }
    })(req, res, next);

});

/*
*
*/
router.post('/registerPhysician', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var physician = new Physician();

  physician.username = req.body.username;

  physician.email = req.body.email;

  physician.contactNo = req.body.contactNo;

  physician.speciality = req.body.speciality;

  physician.registrationNo = req.body.registrationNo;

  physician.setPassword(req.body.password);

  physician.save(function (err){
    if(err){ return next(err); }

    return res.json({token: physician.generateJWT()})
  });
});

router.post('/loginPhysician', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('physician-local', function(err, physician, info){
    if(err){ return next(err); }

    if(physician){
      return res.json({token: physician.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});
