doc = app.documents[0];

p_style = doc.paragraphStyles;
c_style = doc.characterStyles;

for (var pi=2; pi < p_style.length; pi++) {
	p_style[pi].name = getHexFileName (8);
};

for (var ci=1; ci < c_style.length; ci++) {
	c_style[ci].name = getHexFileName (12)
};


function getHexFileName (num){
	var cha = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	var str = cha[10+Math.floor(6*Math.random())];
	for (var i=0; i < num-1; i++){
		str += cha[Math.floor(cha.length*Math.random())];
		}
	return str;
}