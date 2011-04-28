/**
 * remember setting dialog test
 */

//config name
var conf_name = "remember.txt";
//path to script panel folder
var scrt_fol = app.scriptPreferences.scriptsFolder;
var conf_file = new File( scrt_fol + "/" + conf_name );
conf_file.encoding = "UTF-8";
var conf_json = "";
if ( conf_file.open("r") ){
	conf_json += conf_file.read();
	if ( conf_json !== "" ) {
		var conf_obj = eval( conf_json );//eval("({key:value})")
	};
}
else{
	var conf_obj = {};
}

//dialog
var dlg = new Window('dialog', "remember", undefined, {borderless: false});
dlg.panel = dlg.add('panel');
dlg.panel.alignChildren = 'left';
var ddl = dlg.panel.add('dropdownlist', undefined, ["tokyo", "nagoya", "osaka", "kyoto", "fukuoka"]);
var edt = dlg.panel.add('edittext', [0,0,150,90], undefined, {multiline: true});
//default value
ddl.selection = conf_obj['place'] === undefined ? 0 : conf_obj['place'];
edt.text = conf_obj['memo'] === undefined ? "this is defalut, tokyo is defalut selection": conf_obj['memo'];
//button
dlg.group = dlg.add('group');
var ok_btn = dlg.group.add('button', undefined,"OK", {name:'ok'});
var can_btn = dlg.group.add('button',undefined,"Cancel", {name:'cancel'});
var reset_btn = dlg.group.add('button',undefined,"Reset", {name:'reset'});

//export remember setting
ok_btn.onClick = function () {
	var setting_obj = {};
	setting_obj['place'] = ddl.selection.index;
	setting_obj['memo'] = edt.text;
	var ex_conf = new File(scrt_fol + "/" + conf_name);
	if ( ex_conf.open("w") ) {
		ex_conf.write( setting_obj.toSource() );//
	};
	dlg.close();
}
//reset to default value
reset_btn.onClick = function () {
	ddl.selection = 0;
	edt.text = "this is defalut, tokyo is defalut selection";
}
dlg.show();