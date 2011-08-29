/*
つぶつぶしたものを輪にする
"create ring by beads"

使い方：
最前面のドキュメントの中心左側付近から、透明度の違うまるい物で輪にします。
最後にシェイプを変更します。

設定によりペーストボードをはみ出すことがあります。
オブジェクトはグループ化されます。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0){
        var doc = app.documents.add();
        }
var doc = app.documents[0];

var dWidth = 0;//doc.documentPreferences.pageWidth;

var dHeight = doc.documentPreferences.pageHeight;
//ルーラーを一時的にスプレッドにする
var rulerBk = doc.viewPreferences.rulerOrigin;
var rulerTemp = RulerOrigin.SPREAD_ORIGIN;
doc.viewPreferences.rulerOrigin = rulerTemp;

//パラメータたち
var tubeValue   = 20;//つぶつぶのかず、一周をこの個数で割ります
var randMinR    = 5;//つぶつぶの最小半径

var randMaxR    = randMinR;//つぶつぶの最大半径//つぶつぶの半径は同じにする
//var randAngle = 360;//ランダム角度のレンジ（0〜360）

var startR = randMinR+(randMaxR-randMinR)*Math.random();
var seedOval = doc.ovals.add();
seedOval.geometricBounds = [dHeight/2, dWidth/2, dHeight/2+2*startR, dWidth/2+2*startR];
seedOval.strokeColor = "None";
seedOval.strokeWeight = 0;
seedOval.fillColor = "Black";
var seedCenter = [dWidth/2+startR, dHeight/2+startR]//x,y 最初のつぶのまんなか

//オブジェクトと半径と中心座標を配列にしていく
var familyG = new Array();
var familyR = new Array();
var familyC = new Array();
familyG.push(seedOval);
familyR.push(startR);
familyC.push(seedCenter);

//角度と半径をかえながら増殖
for(var i = 0; i<tubeValue; i++){
	var childR = randMinR+(randMaxR-randMinR)*Math.random();//あたらしい半径
	
	//var childRadi = randAngle*2*Math.PI/360*Math.random();//移動角度
	//ちょっとずつ角度を増やして一周させる
	var childRadi = 360/tubeValue*(i+1)*2*Math.PI/360;//移動角度
	
	var childCenter = [
		familyC[i][0]+(familyR[i]+childR)*Math.sin(childRadi), 
		familyC[i][1]+(familyR[i]+childR)*Math.cos(childRadi)
		];
	var childOval = familyG[i].duplicate();
	childOval.geometricBounds = [
		familyC[i][1]+(familyR[i]+childR)*Math.cos(childRadi)-childR,
		familyC[i][0]+(familyR[i]+childR)*Math.sin(childRadi)-childR,
		familyC[i][1]+(familyR[i]+childR)*Math.cos(childRadi)+childR,
		familyC[i][0]+(familyR[i]+childR)*Math.sin(childRadi)+childR
		];
	//不透明度を20％以上60％未満でランダムに
	childOval.transparencySettings.blendingSettings.opacity = 20+40*Math.random();
	//配列に追加
	familyR.push(childR);
	familyG.push(childOval);
	familyC.push(childCenter);
	}
//オブジェクトの配列でグループ化
var familyP = doc.groups.add(familyG);

var convOption;
var convOptNo = prompt("1.斜角の四角形 2.内丸角の四角形 3.多角形 \r4.四角形 5.丸角の四角形 6.三角形 7.楕円",4);
switch(convOptNo){
	case "1": convOption = ConvertShapeOptions.CONVERT_TO_BEVELED_RECTANGLE; break;
	case "2": convOption = ConvertShapeOptions.CONVERT_TO_INVERSE_ROUNDED_RECTANGLE; break;
	case "3": convOption = ConvertShapeOptions.CONVERT_TO_POLYGON; break;
	case "4": convOption = ConvertShapeOptions.CONVERT_TO_RECTANGLE; break;
	case "5": convOption = ConvertShapeOptions.CONVERT_TO_ROUNDED_RECTANGLE; break;
	case "6": convOption = ConvertShapeOptions.CONVERT_TO_TRIANGLE; break;
	case "7": convOption = ConvertShapeOptions.CONVERT_TO_OVAL; break;
	default : convOption = ConvertShapeOptions.CONVERT_TO_OVAL; break;
	}
var childrenP = familyP.pageItems;
for(var j = 0; j<childrenP.length; j++){
	childrenP[j].convertShape (convOption,5,50,3);//(convertShapeOption, numberOfSides, insetPercentage, cornerRadius)
	}

//ルーラーを元に戻す
doc.viewPreferences.rulerOrigin = rulerBk;
