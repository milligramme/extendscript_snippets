/**
 *  create line wave
 */
#targetengine "session"
// 
var doc = app.documents.length === 0 ? app.documents.add() : app.documents[0];
var doc_w = doc.documentPreferences.pageWidth;

// Main
var plt = new Window('palette',"Wave",　undefined);

// Logger
var log_plt = new Window('palette',"Log",　undefined);
var log = "";
var log_edt       = log_plt.add('edittext',undefined, log, {multiline: true});
var log_clear_btn = log_plt.add('button',undefined, "Clear");
log_edt.size = [240, 320];

log_plt.show();
// Mainパレットから、XXpx位置をずらす
var bon = log_plt.bounds;
var mov = 300; 
log_plt.bounds = [bon[0]+mov, bon[1], bon[2]+mov, bon[3]];

plt.g = plt.add('group', undefined);
plt.g.add('statictext', undefined, "pitch");
var pitch      = plt.g.add('edittext', undefined, "1");
var sld        = plt.g.add('slider', undefined, 0.1, 0.1, doc_w);
var create_btn = plt.g.add('button', undefined, "Create");
pitch.characters = 3;
sld.size = [240, 22];


// スライダーの動作をログに記録
sld.onChanging = function () {
	log_edt.text += sld.value + ", ";
}

// Logが空でなければ実行
create_btn.onClick = function () {
	log_plt.show();
	if (log_edt.text !== ""){
		var array = log_edt.text.replace(/(, )$/,"").split(',');
		vector (array, pitch.text * 1);
	}
}
// Logパレットをクリア
log_clear_btn.onClick = function () {
	log_edt.text = "";
}

// Mainパレットを閉じたらLogパレットも閉じる
plt.onClose = function () {
	log_plt.close();
}

plt.center();
plt.show();

function vector (array, pitch) {
	var org = [0,0];
	var grp_arr = [];	
	for (var i=0; i < array.length; i++) {
		var gl = doc.graphicLines.add({
			geometricBounds : [org[1]+i*pitch, org[0], org[1]+i*pitch, org[0]+array[i]]
			});
		grp_arr.push(gl);
	};
		var group = doc.groups.add(grp_arr);
}