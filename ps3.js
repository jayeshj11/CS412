var router = require('express').Router();
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
router.get('/p3', function(req, res, next) {
  res.render('ps3', { title: 'First Part of the Homework' });
});

router.get('/p3b', function(req, res, next) {
  var json ={strings:'Second part of the homework'}
  res.render('ps3b',{title: 'Fourth Part of the Homework', json1: json});
});

router.get('/:names', function(req, res) {
  const name = req.params.names;
  console.log(name)
  var json ={names:name}
  res.render('ps3d',{title: 'Fourth Part of the Homework', json1: json});
  });

module.exports = router;
