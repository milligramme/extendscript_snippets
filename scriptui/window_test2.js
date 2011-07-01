wu = new Window('dialog');
// wu.orientation = "column"
wu.alignChildren = "left"
for (var i=0; i < 20; i++) {
	t = wu.add('statictext',undefined, "message")
	// t.characters = 12;
	t.indent = i*25;
};
b = wu.add('button', undefined,"nunu")
b.size = [300,20];

b.onClick = function () {
	this.text = this.text+"nu"
	// ed.size = [90,90]
}

wu.show()