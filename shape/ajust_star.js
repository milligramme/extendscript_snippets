/**
星型をととのえる
"adjust the shape of a star"

使い方：
多角形オブジェクトを選んで実行。
ダイアログが出るので、頂点の数と星型の比率を入力して続行。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/

if(app.documents.length >= 1 && app.selection.length==1){
	var selObj = app.selection[0];
	switch (selObj.constructor.name){
		case "Polygon": 
		case "Rectangle": 
		case "TextFrame": 
			main();
			break;
		default : 
			exit();
	}
}
else{
	exit();
}

function main(){
	var currentPP = selObj.paths[0].pathPoints.length;
	var selGBon   = selObj.geometricBounds;
	var selC      = [selGBon[1]+(selGBon[3]-selGBon[1])/2, selGBon[0]+(selGBon[2]-selGBon[0])/2];

	//ピタゴラスの定理からだいたいの比率をもとめる
	var starA, starB, rA, rB;
	starA = selObj.paths[0].pathPoints[0].anchor;
	starB = selObj.paths[0].pathPoints[1].anchor;
	rA = Math.sqrt (Math.pow(selC[0]-starA[0], 2)+Math.pow(selC[1]-starA[1], 2));
	rB = Math.sqrt(Math.pow(selC[0]-starB[0], 2)+Math.pow(selC[1]-starB[1], 2));

var insPer;
if(rA > rB){
	insPer = 100-rB/rA*100;
}
else{
	insPer = 100-rA/rB*100;
}

var starPro = prompt("頂点の数（3-100）と星型の比率（0-100）をコンマでくぎる","" + Math.max(3, currentPP/2)+", "+insPer);
//正規表現チェックがまだ不完全。多少はスルー
if(starPro != null && starPro.match (/\d*[.]?\d*[ ]*,[ ]*\d*[.]?\d*/)){
	var starProArr = starPro.split(",");
	var numOfSide  = Math.min(Math.max(3, parseInt (starProArr[0])), 100);//3-100の整数値
	var insetPer   = Math.min(Math.max(0, parseInt (starProArr[1])), 100);//0-100の整数値
}	
else{
//	alert("値が有効でありません");
	exit();
}
selObj.convertShape (ConvertShapeOptions.CONVERT_TO_POLYGON, numOfSide, insetPer);//(convertShapeOption, numberOfSides, insetPercentage, cornerRadius)
}
