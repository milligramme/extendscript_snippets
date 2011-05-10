#target "Illustrator"
doc = documents[0];
sw = doc.swatches;
for (var i = 0; i<doc.swatches.length; i++){
	$.writeln(sw[i].name);
	}

b = new CMYKColor ();
	b.black = 100;
	b.ctan = 0;
	b.magenta = 0;
	b.yellow = 0;

bsw = sw.add({color : b, name : "Black" })
b.kind