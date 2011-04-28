/**
 * button font change test
 * 
 * 2010-12-01 mg 
 */
var dlg = new Window('dialog',"switch button font");
dlg.orientation = 'row'
var btn = dlg.add('button', [0,0,200,200], 'abcde\nあいうえ\nお猪口\n1234');

dlg.grp = dlg.add('group');
dlg.grp.orientation = 'column';

var font_ddl = dlg.grp.add('dropdownlist', [0,0,120,23], app.fonts.everyItem().name);
var size_arr = [12,18,24,32,48,56];
var size_ddl = dlg.grp.add('dropdownlist', [0,0,120,23], size_arr);
font_ddl.selection = 0;
size_ddl.selection = 0;

font_ddl.onChange = function () {
	btn.graphics.font = ScriptUI.newFont(
		app.fonts[font_ddl.selection.index].fontFamily, 
		app.fonts[font_ddl.selection.index].fontStyleName,
		size_arr[size_ddl.selection.index]
		);
}
size_ddl.onChange = function () {
	btn.graphics.font = ScriptUI.newFont(
		app.fonts[font_ddl.selection.index].fontFamily, 
		app.fonts[font_ddl.selection.index].fontStyleName,
		size_arr[size_ddl.selection.index]
		);
}
dlg.show();