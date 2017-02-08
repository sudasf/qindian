var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var weixin = require('weixin-api');

//微信接口的哈希加密方法  
function sha1(str) {  
    var md5sum = crypto.createHash("sha1");  
    md5sum.update(str);  
    str = md5sum.digest("hex");  
    return str;  
}


// router.get('/', function(req, res, next) {

//     var {signature,echostr,timestamp,nonce}=req.query
//     if(echostr){
// 	  	var token="weixin"
// 		var array=[token,timestamp,nonce]
// 		  array.sort()
// 		  var str=array.join('')
// 		  if(signature==sha1(str)){
// 		    res.send(echostr)
// 		  }else{
// 		  	res.send(false)
// 		  }
// 		}
// });

// config
//weixin.token = "MrJfc8P6uorkV38pqZjcrbBmIC7ckqerFFKhRxe5pNEB5Ijuxmg9zLSGBPMDJknzU-PnREcO3Ov9SJisOgp1hO7xF22R6KitKPCKerG7kopp2LtvIv40hMOW2hEAhr7cKSEcAEANVH";
weixin.token="weixin"
// 接入验证
router.get('/', function(req, res) {

	  // 签名成功
	  if (weixin.checkSignature(req)) {
	    res.send(200, req.query.echostr);
	  } else {
	    res.send(200, 'fail');
	  }
});



// 监听文本消息
weixin.textMsg(function(msg) {
  console.log("textMsg received");
  console.log(JSON.stringify(msg));

  var resMsg = {
    fromUserName : msg.toUserName,
    toUserName : msg.fromUserName,
    msgType : "text",
    content : "欢迎关注！公司新的创业项目，旗舰产品《趣听课吧》，讲座听课互动神器，能有效避免冷场，活跃氛围。它强大的抽奖功能，能迅速热场；它操作简易，扫一扫即可使用，有效解决听众不好意思参与的难题；它具有强大实时互动问答和图表分析的功能，能让你即时了解听众动态，进行针对性讲解！",
    funcFlag : 0
  };

  switch (msg.content) {
    case "text" :
      // 返回文本消息
      resMsg = {
        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "text",
        content : "这是文本回复",
        funcFlag : 0
      };
      break;

    case "音乐" :
      // 返回音乐消息
      resMsg = {
        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "music",
        title : "音乐标题",
        description : "音乐描述",
        musicUrl : "音乐url",
        HQMusicUrl : "高质量音乐url",
        funcFlag : 0
      };
      break;

    case "图文" :

      var articles = [];
      articles[0] = {
        title : "PHP依赖管理工具Composer入门",
        description : "PHP依赖管理工具Composer入门",
        picUrl : "http://weizhifeng.net/images/tech/composer.png",
        url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
      };

      articles[1] = {
        title : "八月西湖",
        description : "八月西湖",
        picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
        url : "http://weizhifeng.net/bayuexihu.html"
      };

      articles[2] = {
        title : "「翻译」Redis协议",
        description : "「翻译」Redis协议",
        picUrl : "http://weizhifeng.net/images/tech/redis.png",
        url : "http://weizhifeng.net/redis-protocol.html"
      };

      // 返回图文消息
      resMsg = {
        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "news",
        articles : articles,
        funcFlag : 0
      }
  }

  weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function(msg) {
  console.log("imageMsg received");
  console.log(JSON.stringify(msg));
});

// 监听语音消息
// weixin.voiceMsg(function(msg) {
//   console.log("voiceMsg received");
//   console.log(JSON.stringify(msg));
// });

// 监听位置消息
weixin.locationMsg(function(msg) {
  console.log("locationMsg received");

  console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
  console.log("urlMsg received");
  console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
  console.log("eventMsg received");
  console.log(JSON.stringify(msg));

  if(msg.event=="subscribe"){
    resMsg = {
      fromUserName : msg.toUserName,
      toUserName : msg.fromUserName,
      msgType : "text",
      content : "苏州亲点易取物联网科技有限公司\n地址：苏州工业园区星湖街328号，创意产业园10幢521室\n联系人：宋开富\n电话：15050136631",
      funcFlag : 0
    };
    weixin.sendMsg(resMsg);
  }
  if(msg.event=="CLICK"){
    resMsg = {
      fromUserName : msg.toUserName,
      toUserName : msg.fromUserName,
      msgType : "text",
      content : "苏州亲点易取物联网科技有限公司\n地址：苏州工业园区星湖街328号，创意产业园10幢521室\n联系人：宋开富\n电话：15050136631",
      funcFlag : 0
    };
    weixin.sendMsg(resMsg);
  }
});

// Start
router.post('/', function(req, res) {
  
  // loop
  weixin.loop(req, res);
  console.log(req.body);

});

module.exports = router;  