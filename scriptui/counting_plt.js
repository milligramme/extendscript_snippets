/**
 * counting palette 
 * 
 * 2010-12-03 mg
 */
#targetengine "session"
var plt = new Window('palette', "Insert Sequential", undefined);

var btn = plt.add('button',[0,0,120,40],"Insert");

//insert string
var format_grp = plt.add('group');
var edt_prefix = format_grp.add('edittext', undefined, "[");
var edt_base = format_grp.add('edittext', undefined, "1");

//set color to edittext CS4 or later
if (app.version.split('.')[0] > 5) {
	edt_base.graphics.foregroundColor = 
		edt_base.graphics.newPen(edt_base.graphics.PenType.SOLID_COLOR,[1,0,0, 1],1);//[r,g,b, transparency],Font?
	edt_base.graphics.backgroundColor = 
		edt_base.graphics.newBrush(edt_base.graphics.BrushType.SOLID_COLOR,[1,1,0, 1]);
};
var edt_postfix = format_grp.add('edittext', undefined, "]");

//setting for increament, decreament
var setting_grp = plt.add('group');
setting_grp.add('statictext',undefined, "set digit: ");
var edt_digit = setting_grp.add('edittext', undefined, "0");
setting_grp.add('statictext',undefined, "pitch: ");
var edt_pitch = setting_grp.add('edittext', undefined, "1");

//set edittext width
edt_prefix.characters = 8;
edt_base.characters = 4;
edt_postfix.characters = 8;
edt_digit.characters = 4;
edt_pitch.characters = 4;

btn.onClick = function () {
	//change to number
	var base_num = edt_base.text * 1;
	var pitch_num = edt_pitch.text * 1;
	
	//fill zero
	var ad = add_zero (edt_base.text, edt_digit.text * 1);
	insert_this (edt_prefix.text + ad + Math.abs(edt_base.text * 1) + edt_postfix.text);
	//count up or down
	edt_base.text = base_num + pitch_num;
}

plt.show();

//insert to document 
function insert_this (string) {
	if (app.selection.length === 1 && app.selection[0].hasOwnProperty('baseline')) {
		var tar = app.selection[0].insertionPoints;
		// tar[-1].appliedCharacterStyle = c_style[style_ddl.selection.index];
		tar[-1].contents = string;
	};
}

// fill zero
function add_zero (string, digit) {
	if (Math.abs(string).length > digit) {
		return ""
	};
	var z = '';
	if (string.charAt(0) === "-") {
		for (var i=0, iL=digit+1-string.length; i < iL; i++) {
			z += '0';
		};
		return "-" + z;
	};
	else {
		for (var i=0, iL=digit-string.length; i < iL; i++) {
			z += '0';
		};
		return z;
	}
}
