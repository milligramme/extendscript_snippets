/**
 * check indesign condition
 */
$.writeln( check_env()['doc_opened'] ); // true => ドキュメントが開いてる
$.writeln( check_env().something_selected ); // undefined => 何も選択していない

function check_env() {
	var obj = {};
	// ドキュメントが何かしら開いてる
	obj['doc_opened'] = app.documents.length !== 0;

	if ( obj['doc_opened'] ) {
		// ドキュメントが一つ以上開いていて、かつ何かオブジェクトを選択している
		obj['something_selected'] = app.selection.length > 0;

		// テキストオブジェクトを選択している（テキストフレームは含まない）
		obj['text_obj_selected'] = app.selection.length === 1 && app.selection[0].hasOwnProperty('baseline');

		// 表、セルを選択している
		obj['table_obj_selected'] = app.selection.length === 1 && app.selection[0].hasOwnProperty('cells');		
	};
	return obj
}

/**
 * check existing styles or objects by name 
 */

// ドキュメントが開いてなければつくる。あれば利用する
// var doc = app.documents.length === 0 ? app.documents.add() : app.documents[0];
var doc = app.documents.length === 0 ? exit() : app.documents[0];

// 所定のスタイルなどがあるか？
var p_name      = "Pu";    // 段落スタイル
var c_name      = "Bold";     // 文字スタイル
var tb_name     = "Grid";  // 表スタイル
var cl_name     = "Gate";     // セルスタイル
var ob_name     = "Anchored"  // オブジェクトスタイル
var swatch_name = "Amber";    // スウォッチ

var p_style    = doc.paragraphStyles; // 段落スタイル
var c_style    = doc.characterStyles; // 文字スタイル
var tb_style   = doc.tableStyles;     // 表スタイル
var cl_style   = doc.cellStyles;      // セルスタイル
var ob_style   = doc.objectStyles;    // オブジェクトスタイル
var swatch_obj = doc.swatches;        // スウォッチ

named_obj_exist(p_style, p_name);
named_obj_exist(c_style, c_name);
named_obj_exist(tb_style, tb_name);
named_obj_exist(cl_style, cl_name);
named_obj_exist(ob_style, ob_name);
named_obj_exist(swatch_obj, swatch_name);

// スウォッチがなければつくる。あれば利用する
var marker_swatch = named_obj_exist(swatch_obj, "Rebuild") 
	? swatch_obj.item("Rebuild") 
	: doc.colors.add({
		model:ColorModel.PROCESS, 
		space:ColorSpace.CMYK, 
		colorValue:[3,11,14,46], 
		name:"Rebuild"});

var marker_swatch;
try {
	marker_swatch = doc.colors.add({model:ColorModel.PROCESS, space:ColorSpace.CMYK, colorValue:[3,11,14,46], name:"Rebuild"});
}
catch(e){
	marker_swatch = swatch_obj.item("Rebuild"); 
}

function named_obj_exist(style, style_name) {
	flg = false;
	for (var i=0, iL=style.length; i < iL; i++) {if (style[i].name === style_name) {flg = true;};};
	return flg
}
	


