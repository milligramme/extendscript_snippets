#target "Illustrator"

function expand_word() {
	var docObj = app.documents[0];
	p = docObj.pageItems;

	for (var i=0, iL=p.length; i < iL ; i++) {
		$.writeln(p[i].name);
		if (p[i].name.match(/(\-?\d+\.?\d+\,?)+/)){
			gBon = p[i].name.split(",");
			$.writeln(gBon);
			p[i].height = Math.abs(gBon[3]- gBon[1]);
			$.writeln(p[i].height);
			p[i].width = Math.abs(gBon[2]- gBon[0]);
			// p[i].selected = true;
			p[i].name = "";
		}
	};
	
}
