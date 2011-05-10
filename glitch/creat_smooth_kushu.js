/**
しゅるしゅる絡まったものをつくる
"create objects like twined pasta"

概要：
スパゲッティオブジェクトをつくります。
色はドキュメントのスウォッチからランダムに選びます。

使い方：
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
var docObj;
if(app.documents.length == 0){
        docObj = app.documents.add();
        }
	docObj = app.documents[0];

//ルーラーを一時的にスプレッドにする
var rulerBk = docObj.viewPreferences.rulerOrigin;
var rulerTemp = RulerOrigin.SPREAD_ORIGIN;
docObj.viewPreferences.rulerOrigin = rulerTemp;

//メイン処理
main(docObj);

//ルーラーを元に戻す
docObj.viewPreferences.rulerOrigin = rulerBk;

//メイン
function main(docObj){
	var docW = docObj.documentPreferences.pageWidth;
	var docH = docObj.documentPreferences.pageHeight;

	//アンカーポイントの個数の最大値
	var shuruMax = 100;
	var shuruValue = 3+Math.round(Math.random()*shuruMax);
	//コントロールハンドルの長さの最小値
	var minLength = 90;
	//コントロールハンドルの長さの最大値は
	//ドキュメントの幅か高さか、コントロールハンドルの最小値の1.5倍のうちちいさい方
	var maxLength = Math.min(Math.min(docW, docH), minLength*1.5); 
	
	var shuruArr = new Array();
	for(var i = 0; i < shuruValue; i++){
		var st = [docW*Math.random(), docH*Math.random()];	
		var handleLength = minLength+(maxLength-minLength)*Math.random();
		//Fnからかえってきた座標を配列に加えていく
		shuruArr.push(SetPathPoint(st, handleLength)); 
	}

	var shuruObj = docObj.rectangles.add();
	with(shuruObj){
		paths[0].entirePath = shuruArr;
		fillColor = "None";
		strokeWeight = "0.5";
		//線の色はスウォッチの中からランダムに選ぶ
		strokeColor = docObj.swatches[Math.floor((docObj.swatches.length-1)*Math.random())];//"Black";
	}
	//全てのパスポイントのコーナーをスムースにする。
	for(var j = 0; j < shuruObj.paths[0].pathPoints.length; j++){
		shuruObj.paths[0].pathPoints[j].pointType = PointType.SMOOTH;
	}
}
//方向線を持たないパスポイントにコントロールハンドルをつけるFn
//引数1: パスポイントの配列
//引数2: コントロールハンドルの長さ
function SetPathPoint (pathpoint, handle){
	var pi = Math.PI/180;
	var theta = 180*pi*Math.random();

	var rightHd = [
		pathpoint[0]-handle*Math.cos(theta),
		pathpoint[1]-handle*Math.sin(theta)
		];
	var leftHd = [
		pathpoint[0]+handle*Math.cos(theta),
		pathpoint[1]+handle*Math.sin(theta)
		];
	//コントロールハンドルつきのパスポイントをかえす
	return [rightHd, pathpoint, leftHd];
}

