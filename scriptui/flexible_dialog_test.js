/**
 * のびのびダイアログ
 * コンテンツに応じてダイアログのサイズを可変させるサンプル
 * 機能：
 * InDesign のスウォッチとレイヤーの名前をリネームする
 */

var docObj = app.documents[0];
var swatchObj = unReservedSwatch(docObj);
var layObj = docObj.layers;

//create dialog
//dialogはpanelのサイズに合わせて自動調整
var dlg = new Window('dialog',"stretch dialog", undefined);
//swatch panel
dlg.panel = dlg.add('panel',[5,5,340,320],"Swaaaaaaaaaatch");
var sw_panelbon = dlg.panel.bounds;

var y1 = 0, swArr = [];
for (var isw=0; isw < swatchObj.length; isw++) {
	swatchObjName = dlg.panel.add('statictext', [20,20+y1,180,40+y1], ''+swatchObj[isw].name);
	swRenameName = dlg.panel.add('edittext', [180,20+y1,320,40+y1], '',{multiline: false});
	y1 += 25;
	swArr.push([swatchObjName, swRenameName]);
}
var py = y1 +35;
//panelのサイズを拡張のびーる
dlg.panel.bounds = [sw_panelbon[0], sw_panelbon[1], sw_panelbon[2], py];

var ly_panelbon = [5, py, 340, py +100];//swatchのパネルの下端から作成、高さはとりあえず100
//layer panel
dlg.panel2 = dlg.add('panel', ly_panelbon, "Layeeeeeeeeeeeer");

var y2 = 0, lyArr = [];
for (var ily=0; ily < layObj.length; ily++) {
	layObjName = dlg.panel2.add('statictext', [20,20+y2,180,40+y2], ''+layObj[ily].name);
	lyRenameName = dlg.panel2.add('edittext', [180,20+y2,320,40+y2], '',{multiline: false});
	y2 += 25;
	lyArr.push([layObjName, lyRenameName]);
	}
var py2 = y2 + 30;
//panel2のサイズを拡張のびーる
dlg.panel2.bounds = [ly_panelbon[0], ly_panelbon[1], ly_panelbon[2], ly_panelbon[1]+py2];

dlg.okButton = dlg.add('button',undefined,"ok",{name: 'ok'});
dlg.cancelButton = dlg.add('button',undefined,"cancel",{name: 'cancel'});

dlg.center();
var flg;
dlg.okButton.onClick = function(){
	flg = true
	dlg.close();	
}
dlg.cancelButton.onClick = function(){
	flg = false
	dlg.close();	
}

dlg.show();

if(flg == true){
	renameswatchObj(docObj, swArr);
	renamelayerObj(docObj, lyArr);
	}


/**
 * raname object (swatch)
 * @param {Object} doc Document
 * @param {Array} array ==> [object, string] 
 */
function renameswatchObj (doc, array) {
	for (var i=0; i < array.length; i++) {
		var stylename = array[i][0].text;
		var renamename = array[i][1].text;
		if(renamename.length > 0){
			var styleObj = doc.swatches.item(stylename);
			retryRename (styleObj, renamename); //Fnへ
			}
		}
}
/**
 * raname object (layer)
 * @param {Object} doc Document
 * @param {Array} array ==> [object, string] 
 */
function renamelayerObj (doc, array) {
	for (var i=0; i < array.length; i++) {
		var stylename = array[i][0].text;
		var renamename = array[i][1].text;
		if(renamename.length > 0){
			var styleObj = doc.layers.item(stylename);
			retryRename (styleObj, renamename); //Fnへ
			}
		}
}
/**
 * regex check and retry rename
 * @param {Object} obj such as Swatch, Layers, ParagraphStyles(exist name property object)
 * @param {String} string rename string
 */
function retryRename (obj, string) {
	//リネームの正規表現チェック
	var regexCheck = string.match(/^[A-Za-z][0-9A-Za-z_-]*/g);
	if(regexCheck != string){
		reg_retry = prompt("ルールにマッチしません",string);
		if(reg_retry){
			string = reg_retry;
			retryRename (obj, string);
			}
		else{exit();}
		}
	//リネームの重複チェック
	try{
		obj.name = string;
		}
	catch(e){
		var retry = prompt("変更前「"+obj.name+"」：\r名前は既にあります。変更して下さい。",string);	
		if(retry){
			retryRename(obj, retry);
			}
		else{exit();}
		}
	
}
/**
 * unreserved swatch
 * @param {Object} doc Document
 * @returns {Array} otherSw the return value 
 */
function unReservedSwatch(doc){
	var swObj = doc.swatches;
	var otherSw = new Array();
	if(swObj.length-4 > 0){
		for(var i=0; i < swObj.length; i++){
			switch(swObj[i].name){
				case "None":
				case "Paper":
				case "Black":
				case "Registration": break;
				default : 
					otherSw.push(swObj[i]);
					break;
				}
			}
		}
	return otherSw;
}
