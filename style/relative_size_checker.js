/**
 *  relative size check in styles
 * 
 * 2010-11-30 mg
 */
if (app.documents.length === 0) {
	exit();
};
var docObj = app.documents[0];
var p_sty = docObj.paragraphStyles;
var c_sty = docObj.characterStyles;


var dlg = new Window('dialog', "relative size check", undefined);

// group and panel
dlg.pnl = dlg.add('panel');
dlg.pnl.alignChildren = 'left';


// in p_grp
var p_grp = dlg.pnl.add('group');
var p_tag = p_grp.add('statictext', undefined, "ParagraphStyle: ");
var p_ddl = p_grp.add('dropdownlist', [0,0,160,22], p_sty.everyItem().name);
p_tag.characters = 15;

// in c_grp
var c_grp = dlg.pnl.add('group');
c_tag = c_grp.add('statictext', undefined, "CharcterStyle: ");
var c_ddl = c_grp.add('dropdownlist', [0,0,160,22], c_sty.everyItem().name);
c_tag.characters = 15;

// in rsl_grp
var rsl_grp = dlg.pnl.add('group');
rsl_grp.alignChildren = 'bottom';
var result_edt = rsl_grp.add('edittext',[0,0,320,240], "result here", {multiline: true});

var btn_grp = rsl_grp.add('group');
btn_grp.orientation = 'column';

// disable
// var sel_all_btn = btn_grp.add('button', undefined, "Select All");

var export_btn = btn_grp.add('button', undefined, "Export", {name: "ok"});
var can_btn = btn_grp.add('button', undefined, "Cancel", {name: "cancel"});

p_ddl.onChange = function () {
	var p_base = p_ddl.selection.index;
	var base_pointsize = p_sty[p_base].pointSize;
	var rest = [];
	for (var i=0, iL=p_sty.length; i < iL ; i++) {
		var is_base = i === p_base ? "\t[[BASE]]" : "";
		rest.push(
			p_sty[i].name + ": \t" + 
			Math.round(p_sty[i].pointSize / base_pointsize * 10000) / 100 + "%" + is_base);
	};
	result_edt.text = rest.join('\r');
};

c_ddl.onChange = function () {
	var c_base = c_ddl.selection.index;
	//if point size isnt defined set 0
	var base_pointsize = c_sty[c_base].pointSize === NothingEnum.NOTHING ? 0 : c_sty[c_base].pointSize;
	var rest = [];
	if (base_pointsize == 0) {
		rest.push("!!! [[BASE]] style doesn\'t have point size value !!!");
	}
	else{
		for (var i=0, iL=c_sty.length; i < iL ; i++) {
			var is_base = i === c_base ? "\t[[BASE]]" : "";
			var tar_pointsize = c_sty[i].pointSize === NothingEnum.NOTHING ? 0 : c_sty[i].pointSize;
			rest.push(
				c_sty[i].name + ": \t" + 
				Math.round(tar_pointsize / base_pointsize * 10000) / 100 + "%" + is_base);
		};
	}
	result_edt.text = rest.join('\r');
};

// disable
// sel_all_btn.onClick = function () {
// 		result_edt.active = true;
// };

export_btn.onClick = function () {
	ex_string = result_edt.text;
	flg = 1;
	dlg.close();
};

can_btn.onClick = function () {
	flg = 0;
	dlg.close();
};

dlg.show();
if (flg === 1) {
	//export report
	export_path = File.saveDialog('choose save location');
	if (export_path !== undefined) {
		fileObj = new File(export_path);
		fileObj.encoding = 'UTF8';
		if(fileObj.open('w') == true){
			fileObj.write(ex_string);
			fileObj.close();
		};
	}
};