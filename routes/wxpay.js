var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function(req, res, next) {
	var {params,query,body}=req
	console.log(params,query,body);
  res.render('index', { title: 'xixi' });
});

router.post('/:id', function(req, res, next) {
	var {params,query,body}=req
	//console.log(req);
	var order_id=req.params.id
	var buf = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
		buf += chunk;
	});
	// 内容接收完毕
    req.on('end', function() {
		xml2js.parseString(buf, function(err, json) {
			if (err) {
                err.status = 400;
            } else {
                req.body = json;
                console.log(json);
            	var output='<xml>'+
				 '<return_code><![CDATA[SUCCESS]]></return_code>'+
				 '<return_msg><![CDATA[OK]]></return_msg>'+
				'</xml>'
				res.type('xml'); 
			  	res.send(output)
            }
        });
		
		
    });


});

module.exports = router;