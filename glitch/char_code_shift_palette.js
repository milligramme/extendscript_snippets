/**
 * charcode shift palette 
 */
#targetengine "session"
// documents open?
if (app.documents.length === 0 || app.selection.length === 0) {
	exit();
};
if (app.selection.length !== 1) {
	exit();
};

var selObj = app.selection[0];
// text object?
if (selObj.hasOwnProperty('baseline') == false) {
	exit();
}
var selc = selObj.contents;
var plt = new Window('palette', "Char. Code Shifter", undefined);
plt.panel = plt.add('panel');
// add elements
var slider_label = plt.panel.add('statictext',[0,0,40,22], "0")
var codeshift_slider = plt.panel.add('slider',[0,0,190,22], 0, -50, 50);
var content_text = plt.panel.add('statictext', [0,0,190,150], selc, {multiline: true});
// initialize
var pitch = 0;
var mode = 0;
// add buttons with grouping
plt.btn_grp = plt.add('group');
var codeshift_btn = plt.btn_grp.add('button', [0,0,69,23], "apply");
var resel_btn = plt.btn_grp.add('button', [0,0,69,23], "reselect");
var undo_btn = plt.btn_grp.add('button', [0,0,46,23], "undo");

//callbacks
//slider
codeshift_slider.onChanging = function () {
	var v = Math.round(this.value);
	slider_label.text =  v;
	pitch = v;
	mode = 1;
	char_code_shift(selc);
}
//character code shift
codeshift_btn.onClick = function () {
	pitch = slider_label.text * 1.0;
	mode = 2;
	char_code_shift(selc);
}
//get selection again
resel_btn.onClick = function () {
	codeshift_slider.value = pitch =  0;
	slider_label.text = 0;
	if (app.selection[0].hasOwnProperty('baseline')) {
		selc = app.selection[0].contents;
	};
	mode = 1;
	char_code_shift(selc);
}
//undo
undo_btn.onClick = function () {
	app.documents[0].undo();
}
plt.show();

/**
 *  char code shift
 * 
 * if text object contents shift character code with slider's value.
 * but dont convert to the character code from 0x00 to 0x1f.
 * 
 * when re-select other than text , return alert
 * 
 * @param {String} selc Selection contents
 */
function char_code_shift (selc) {
	if (app.selection[0].hasOwnProperty('baseline') && mode !== 0) {
		var replace_code_shift = "";
		for (var si=0, siL=selc.length; si < siL ; si++) {
			if (selc[si].charCodeAt(0) !== 'd') {
				var ff = (selc[si].charCodeAt(0) + pitch) > 32 //'space' = 33
					? (selc[si].charCodeAt(0) + pitch).toString(16) //convert if forward of 'space'
					: selc[si].charCodeAt(0).toString(16); //dont convert if behind of 'space'
				replace_code_shift += String.fromCharCode('0x'+ff);
			}else{
				replace_code_shift += selc[si];
			}
		};
		if (mode === 1) {
			content_text.text = replace_code_shift;
		};
		if (mode ===2) {
			app.selection[0].contents = replace_code_shift;
		};
	}
	else{
		alert('Selection Error');
	}
}
