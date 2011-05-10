#target "Illustrator"

function press_word () {
	var docObj = app.documents[0];
	var tf = docObj.textFrames.add();
	pron = prompt("setword");
	if(pron === null){
		return
	}
	tf.contents = pron;
	tf.textRange.paragraphs[0].textFont = app.textFonts.getByName("KozMinPro-ExtraLight");
	tf.paragraphs[0].size = 400;

	// tf = app.selection[0];
	grou = tf.createOutline();
	gBon = grou.geometricBounds;
	grou.height = 0.1;
	grou.width = 0.1;
	grou.name = gBon.toString();
	grou.selected = false;
}