// add index label to each pathpoints

var doc = app.documents[0];
var sel = doc.selection[0];
var ppp = sel.paths[0].pathPoints;
var gr = [];
for(var i=0; i < ppp.length; i++){
	var ppAn = ppp[i].anchor;
	var ppIn = ppp[i].index;
	var tf = sel.parent.textFrames.add();
	tf.contents = ppIn.toString();
	tf.fillColor = "Yellow";
	tf.geometricBounds=[ppAn[1], ppAn[0], ppAn[1]+4, ppAn[0]+6];
	tf.textWrapPreferences.textWrapType = TextWrapTypes.NONE;
	gr.push(tf);
}

var ggg = sel.parent.groups.add( gr );
//ggg.remove();