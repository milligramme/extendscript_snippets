/*
カクカク限定ブレンド
"angular objects mixer"

使い方：
二つのオブジェクトを選択して実行します。
それとなくブレンドします。

動作する条件
# オブジェクトは２つ
# 各オブジェクトのアンカーポイントは一緒の数である
# 各オブジェクトはコントロールハンドルのない角でできていること（楕円、ベジェ曲線はだめ）
# 塗りおよび線の色はブレンドしません（開始オブジェクトにあわせる）
# 濃度と線の太さはブレンドする
# オープンパス・クローズドパスは開始オブジェクトにあわせる
# 角オプションはブレンドしません（角丸などはなしになります）
# 透明度はブレンドしません

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
//おまじない
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

var doc = app.documents[0];
var sel = app.selection;

var step = prompt ("ステップ数を入力してください", 10, "blend step");

if(sel.length==2){

	var startObj  = sel[0];
	var endObj    = sel[1];
	var startPath = startObj.paths[0].entirePath;
	var endPath   = endObj.paths[0].entirePath;

	if(startPath.length == endPath.length){
		for(var st=1; st<step; st++){
	        var blendBank=new Array();
			for(var pp=0; pp < startPath.length; pp++){
				if(startObj.paths[0].pathPoints[pp].pointType != PointType.SMOOTH
         && endObj.paths[0].pathPoints[pp].pointType != PointType.SMOOTH){
			blendBank.push([
				startPath[pp][0] + st*(endPath[pp][0]/step-startPath[pp][0]/step),
				startPath[pp][1] + st*(endPath[pp][1]/step-startPath[pp][1]/step)
				]);
				}
				else{err("曲線がまざっています");}
			}
			var blendPath=doc.rectangles.add();
			blendPath.paths[0].entirePath=blendBank;//ステップごとの座標にいれかえ
			//オープンパスかクローズドパスかはstartObjにあわせる。
			blendPath.paths[0].pathType=startObj.paths[0].pathType;
			//線
			blendPath.strokeColor=startObj.strokeColor;
			blendPath.strokeWeight=startObj.strokeWeight+(endObj.strokeWeight-startObj.strokeWeight)/step*st;
			if(startObj.strokeTint=="-1"){var startSTint=100;}else{startSTint=startObj.strokeTint;}
			if(endObj.strokeTint=="-1"){var endSTint=100;}else{endSTint=endObj.strokeTint;}
			blendPath.strokeTint=startSTint+(endSTint-startSTint)/step*st;
			//塗り
			blendPath.fillColor=startObj.fillColor;
			if(startObj.fillTint=="-1"){var startFTint=100;}else{startFTint=startObj.fillTint;}
			if(endObj.fillTint=="-1"){var endFTint=100;}else{endFTint=endObj.fillTint;}
			blendPath.fillTint=startFTint+(endFTint-startFTint)/step*st;
		}//for step
		endObj.bringToFront();//重なりを正す
	}
	else{
		err("パスの数がいっしょでない");
	}//if path lenght same
}else{
	err("ふたつでない");
}//if sel 2

//エラー
function err(mes){
	alert(mes);
	exit();
}
	