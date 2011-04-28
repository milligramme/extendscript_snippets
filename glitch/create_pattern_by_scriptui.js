/**
 * create pattern by checkbox 
 */
var w = 12;
var h = 12;

// create checkbox matrix
var dlg = new Window('dialog',"Create Dot Pattern");
dlg.pnl = dlg.add('panel');
dlg.orientation = 'row';
dlg.alignChildren = 'bottom';
var chb_arr = []; // array for all checkboxes
for (var j=0; j < h; j++) {
	var grp = dlg.pnl.add('group');
	for (var i=0; i < w; i++) {
		chb_arr.push(grp.add('checkbox',undefined,""));
	};
};
// random check to check boxes
var remove_arr = shuffle_or_get_checkbox (chb_arr, true);

// slider for set object size
var sld_grp = dlg.pnl.add('group');
var shape_list = ["Oval", "Rectangle", "Polygon", "Line"];
var ddl = sld_grp.add('dropdownlist', [0,0,120,23], shape_list);
ddl.selection = 0;
var sld = sld_grp.add('slider',[0,0,140,23],5,1,100);//defalut: 5, range: 1-100
var sld_txt = sld_grp.add('statictext', [0,0,45,23], sld.value);

// button group
var btn_grp = dlg.add('group');
btn_grp.orientation = 'column';
var reset_btn = btn_grp.add('button', undefined, 'Clear');// switch fill / clear
var shuffle_btn = btn_grp.add('button', undefined, 'Shuffle');// re-shuffle
btn_grp.add('group',[0,0,1,40])
var can_btn = btn_grp.add('button', undefined, "Cancel", {name:'cancel'});
var ok_btn = btn_grp.add('button', undefined, "OK", {name:'ok'});
var rest = 0;

reset_btn.onClick = function () {
	if (rest%2 === 0) {// even
		for (var i=0, iL=chb_arr.length; i < iL ; i++) {
			chb_arr[i].value = false; //clear all checkboxes
		};
		rest += 1;
		reset_btn.text = 'Fill'; //button switch to fill
		remove_arr = shuffle_or_get_checkbox (chb_arr);
	}
	else {// odd
		for (var i=0, iL=chb_arr.length; i < iL ; i++) {
			chb_arr[i].value = true; //fill all checkboxes
		};
		rest += 1;
		reset_btn.text = 'Clear'; //button switch to clear
		remove_arr = shuffle_or_get_checkbox (chb_arr);
	}
}

shuffle_btn.onClick = function () {
	remove_arr = shuffle_or_get_checkbox (chb_arr, true);
}

sld.onChanging = function () {
	sld_txt.text = Math.round(sld.value);// slider label
}

ok_btn.onClick = function () {
	sq = Math.round(sld.value);
	shp = ddl.selection.index;
	remove_arr = shuffle_or_get_checkbox (chb_arr);
	dlg.close();
	a = true
}
can_btn.onClick = function () {
	dlg.close();
	a = false
};
dlg.show();

if (a == true) {main();};
function main () {
	var dup = [];
	var doc = app.documents.add();
	for (var hi=0; hi < h; hi++) {
		for (var wi=0; wi < w; wi++) {
			var shape = add_shape(doc, shp);
			shape.geometricBounds = [0, 0, sq, sq];
			dup.push(shape.duplicate(undefined, [sq * wi, sq * hi]));
			shape.remove();
		};
	};
	doc.groups.add(dup);
	for (var i=0; i < remove_arr.length; i++) {
		dup[remove_arr[i]].remove();
	};
}
/**
 * create shape to target
 * 
 * @param {Number} shp 0:oval, 1:rectangle, 2:polygon, 3:line
 */
function add_shape (target, shp) {
	switch(shp){
		case 0: return target.ovals.add(); break;
		case 1: return target.rectangles.add(); break;
		case 2: return target.polygons.add(); break;
		case 3: return target.graphicLines.add(); break;
		default: ; break;
	}
}

/**
 *  shuffle checkbox value, get checkbox status
 * 
 * @param {Boolean} mode true: shuffle checked [optional]
 */
function shuffle_or_get_checkbox (array, mode) {
	var boo_arr = [];
	for (var ai=0; ai < array.length; ai++) {
		if (mode == true) {//if true shuffle
			var z = Math.round(Math.random());//0 or 1
			array[ai].value = z == 0 ? false : true;
		};
		if (array[ai].value == false){
			boo_arr.push(ai);
		};
	};
	return boo_arr
}