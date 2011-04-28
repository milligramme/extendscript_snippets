alert($.locale);
var ob = {
	en:"helloworld", 
	ja:"こんにちわーるど",
	fr: "bonjour monde"
	};

$.localize = true;

$.locale = 'en_EN';
alert(ob);

$.locale ='ja_JP';
alert(ob);

$.locale ='fr_FR';
alert(ob);

$.locale=null
alert($.locale);// => ja_JP