var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var {params,query,body}=req
	console.log(params,query,body);
  res.render('index', { title: 'xixi' });
});

router.post('/:id', function(req, res, next) {
	var {params,query,body}=req
	//console.log(req);
	console.log(params,query,body);
  res.render('index', { title: 'xixi' });
});

module.exports = router;