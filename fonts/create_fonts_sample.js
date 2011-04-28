/**
 * create font sample 
 */

//fonts par documents
var font_par_doc = 30;
//amount of documents
var doc_amount = 1;
//language
var lang = 1;//0:Roman, 1:Japanese....
//sample text
var con = {//add writingscript and text
	0: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
	1: "具ヌー寺の和尚がカボスを嫉む、琵と取れんと見上げるアキの空。"
	};

var sum_font = app.fonts.length;
var i = 0;
for (var j=0; j < doc_amount ; j++) {
	var doc = app.documents.add();
	var tf = doc.textFrames.add();
	var doc_info = getDocInfo(doc);
	tf.geometricBounds = [
		doc_info['maT'], 
		doc_info['maL'], 
		doc_info['H']-doc_info['maB'], 
		doc_info['W']-doc_info['maR']
		];
	var st = tf.parentStory;
	with(st){
		pointSize = "12pt";
		leading = "18pt";
	}
	var t = 0;
	while( t < font_par_doc) {
		if (j * font_par_doc + i >= sum_font) {
			exit();
		};
		if (app.fonts[i].writingScript == lang) {
			st.insertionPoints[-1].contents = con[lang] + "\r";
				st.paragraphs[t].appliedFont = app.fonts[ j * font_par_doc + i ];
			i++;
			t++;
		};
		else{
			i++;
		}
	};
};

function getDocInfo (doc) {
	var inf = {};
	inf['H'] = doc.documentPreferences.pageHeight;
	inf['W'] = doc.documentPreferences.pageWidth;
	inf['maL'] = doc.marginPreferences.left;
	inf['maT'] = doc.marginPreferences.top;
	inf['maR'] = doc.marginPreferences.right;
	inf['maB'] = doc.marginPreferences.bottom;
	return inf;
}