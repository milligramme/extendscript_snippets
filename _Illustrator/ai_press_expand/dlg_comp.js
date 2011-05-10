#target "Illustrator"
v = script_ui_dlg ();
alert(v)
function script_ui_dlg () {
	var fon = app.textFonts
	fon_arr = [];
	for (var i=0, iL=fon.length; i < iL ; i++) {
		fon_arr.push(fon[i].name);
	};
	siz_arr = [6,7,8,9,10,11,12,14,16,18,21,24,28,36,48,60,72,96,108];
	dir_arr = ["both", "height", "width"];

	var dlg = new Window('dialog', "compress/expand word", undefined);
	dlg.panel = dlg.add('panel',undefined);
	dlg.panel.alignChildren = "left";
	dlg.panel.group1 = dlg.panel.add('group');
		dlg.panel.group1.add('statictext', undefined, "Word: ");
		var textarea = dlg.panel.group1.add('edittext', [60,0,240,30], "TextArea ");
	dlg.panel.group2 = dlg.panel.add('group');
		dlg.panel.group2.add('statictext', undefined, "Font: ");
		var fon_ddlist = dlg.panel.group2.add('dropdownlist',[60,0,240,30], fon_arr);
	dlg.panel.group3 = dlg.panel.add('group');
		dlg.panel.group3.add('statictext', undefined, "Size: ");
		var siz_ddlist = dlg.panel.group3.add('dropdownlist',undefined, siz_arr);
		dlg.panel.group3.add('statictext', undefined, "Pt");

	dlg.panel.group4 = dlg.panel.add('group');
		dlg.panel.group4.add('statictext', undefined, "Compress: ");
		var dir1_rdbtn = dlg.panel.group4.add('radiobutton', undefined, dir_arr[0]);
		var dir2_rdbtn = dlg.panel.group4.add('radiobutton', undefined, dir_arr[1]);
		var dir3_rdbtn = dlg.panel.group4.add('radiobutton', undefined, dir_arr[2]);

	//selection default dropdownlist and radiobutton
	fon_ddlist.selection = 0;
	siz_ddlist.selection = siz_arr.length-1;
	dir1_rdbtn.value = false;
	dir2_rdbtn.value = true;
	dir3_rdbtn.value = false;

	dlg_button = dlg.add('group');
	var ok_btn = dlg_button.add('button', undefined, "OK", {name:'ok'});
	var cancel_btn = dlg_button.add('button', undefined, "Cancel", {name:'cancel'});

	ok_btn.onClick = function() {
		flg = true;
		dlg.close();
	}
	cancel_btn.onClick = function() {
		flg = false;
		dlg.close();
	}
	dlg.show();
	dlg.center();

	if (flg) {
		var dir;
		var s_text = textarea.text;
		var f_name = fon_ddlist.selection.text;
		var size_f = siz_ddlist.selection.text;
		if(dir1_rdbtn.value){dir = "b";}
		if(dir2_rdbtn.value){dir = "h";}
		if(dir3_rdbtn.value){dir = "w";}
		return [s_text, f_name, size_f, dir];
	};

}