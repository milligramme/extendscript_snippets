/**
オブジェクトに沿ってゲジゲジまたはグリグリをつくる
"creat warmy or curly locus"
使い方：
対応するオブジェクトを一つ選択して実行。
線、テキストフレーム、多角形（オープンパス・クローズドパス）、四角形、楕円オブジェクトに対応。
選択したオブジェクトのアンカーポイントの位置を利用してゲジゲジしたもの又は規則的なグリグリしたものでトレースします。
ベジェ曲線はトレースしません。
元のオブジェクトはそのまま残します。
動作確認：OS10.4.11 InDesign CS3
milligramme
www.milligramme.cc
*/

if (check_object(app.documents) !== undefined) {
	var doc = check_object(app.documents)[0];
	var sel = check_object(app.documents)[1];
	dlg_result = dialog_gri ();
	//ルーラーを一時的にスプレッドにする
	var rulerBk = doc.viewPreferences.rulerOrigin;
	var rulerTemp = RulerOrigin.SPREAD_ORIGIN;
	doc.viewPreferences.rulerOrigin = rulerTemp;
	var page = doc.pages.itemByName(sel.parent.appliedSection.name + sel.parent.name);
	var pi = Math.PI / 180;//degree to radian
	var moArray = [];
	var startPoint, endPoint;
	for(var p = 0; p < sel.paths[0].pathPoints.length-1; p += 1){
		if(p < sel.paths[0].pathPoints.length-1){
			startPoint = sel.paths[0].pathPoints[p].anchor;
			endPoint = sel.paths[0].pathPoints[p+1].anchor;
		}
		getLocus(startPoint, endPoint, dlg_result[0]);
	}
	if(sel.paths[0].pathType == PathType.CLOSED_PATH){
		startPoint = sel.paths[0].pathPoints[-1].anchor;
		endPoint = sel.paths[0].pathPoints[0].anchor;
	}
	getLocus(startPoint, endPoint, dlg_result[0]);
	grinPlace(page, moArray, dlg_result[1], dlg_result[2], dlg_result[3]);
	//ルーラーを元に戻す
	doc.viewPreferences.rulerOrigin = rulerBk;
};

/**
 * @param {Objects} docs Collection of Documents
 * @returns {Boolean} Describe the return value
 */
function check_object (docs) {
	if(docs.length === 0){
		return undefined;
	}
	var doc = docs[0];
	if(app.selection.length === 1){
		var sel = app.selection[0];
		switch(sel.constructor.name){
			case "GraphicLine": ; break;
			case "TextFrame": ; break;
			case "Polygon": ; break;
			case "Rectangle": ; break;
			case "Oval": ; break;
			default:
				alert("対応しないオブジェクトです");
				return undefined;
		}
	}
	else{
		alert("オブジェクトを一つだけ選択してください");
		return undefined;
	}
	//アンカーポイントが2個以下のときは終了
	if(sel.paths[0].pathPoints.length < 2){
		return undefined;
	}
	else{
		return [doc, sel]; 
	}
}

/**
 * dialog
 * 
 * @returns {Number} vSpeed pitch to move
 * @returns {Number} childArm basesize for rounding
 * @returns {Number} degreePerCount degree of rounding
 * @returns {Boolean} childRandom if true random
 */
function dialog_gri () {
	//ダイアログ
	var dialogObj = app.dialogs.add({name:"grigrigrigri3.5", canCancel:true});
	with(dialogObj){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "pitch"});
				}
				with(dialogColumns.add()){
					var speed = realEditboxes.add({editValue: 0.5});
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "thickness"});
				}
				with(dialogColumns.add()){
					var thickness = realEditboxes.add({editValue: 24});
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "degree"});
				}
				with(dialogColumns.add()){
					var deg = angleEditboxes.add({editValue: 30, minimumValue:1, maximumValue:120});
				}
			}
			with(borderPanels.add()){
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "trace with grin or gezy"});
					var grinOrGezRadioButton =radiobuttonGroups.add();
					with(grinOrGezRadioButton){
						var grinRadioB = radiobuttonControls.add({staticLabel:"grin grin"});
						var gezyRadioB = radiobuttonControls.add({staticLabel:"gezy gezy", checkedState:true});
					}
				}
			}
		}
	}
	if(dialogObj.show() == true){
		var vSpeed = speed.editValue; //仮想移動速度。ちいさい程、分割数が多くなる（ステップ数が増える）
		var childArm = thickness.editValue/2; //だいたいの太さ
		var degreePerCount = deg.editValue; //ぐるぐると360°を分割してまわる角度
		var childRandom;//trueでゲジゲジ、falseで規則的なグリグリ模様になる
		if(grinOrGezRadioButton.selectedButton == 0){
			childRandom = false;
		}
		else if(grinOrGezRadioButton.selectedButton == 1){
			childRandom = true;
		}
		dialogObj.destroy();
		return [vSpeed, childArm, degreePerCount, childRandom];
	}
	else{
		dialogObj.destroy();
		return undefined
	}
}

/**
 * put dimension into array
 * 
 * @param {Array} start Dimension 
 * @param {Array} end Dimension 
 * @param {Number} vSpeed pitch to move 
 */
function getLocus(start, end, vSpeed){
	var selW = end[0]-start[0];
	var selH = end[1]-start[1];
	//アンカー間の距離と傾き
	var selDist = Math.sqrt (Math.pow(selW, 2) + Math.pow(selH, 2));
	var selRad = Math.atan(selH/selW);
	//移項（xの負の方向への移動のとき）
	var aljabr;
	if(selW < 0){
		aljabr = -1;
	}
	else{
		aljabr = 1;
	}
	//設定した間隔で座標を取得
	for(var i = 0; i < selDist/vSpeed; i++){
		var moX = start[0] + aljabr * vSpeed * i * Math.cos(selRad);
		var moY = start[1] + aljabr * vSpeed * i * Math.sin(selRad);
		moPoint = [moX, moY];
		moArray.push(moPoint);
	}
	//端数で終端に達しなかった時
	if(moArray[-1] != end){
		moArray.push(end);
	}
}
/**
 * create path
 * 
 * @param {Object} page parent page of selection
 * @param {Array} array array of path points
 * @param {Number} arm base size for rounding
 * @param {Number} degree degree of rounding
 * @param {Boolean} random if true random, false sequencial
 */
function grinPlace(page, array, arm, degree, random){
	var chiArray = [];
	for(var j = 0; j < array.length; j++){
		for(var k = 0; k < 360/degree; k++){
			if(random == true){
				childX = array[j][0] + arm * Math.cos(pi * degree * k) * Math.random();
				childY = array[j][1] + arm * Math.sin(pi * degree * k) * Math.random();
			}
			else{
				childX = array[j][0] + arm * Math.cos(pi * degree * k);
				childY = array[j][1] + arm * Math.sin(pi * degree * k);
			}
			chiPoint = [childX, childY];
			chiArray.push(chiPoint);
		}
	}
	chiObj = page.rectangles.add();
	chiObj.paths[0].entirePath = chiArray;
	chiObj.paths[0].pathType = PathType.OPEN_PATH;
	chiObj.fillColor = "None";
	chiObj.strokeWeight = 0.1;
	chiObj.strokeColor = "Black";
}