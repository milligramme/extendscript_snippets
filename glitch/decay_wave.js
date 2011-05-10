/*
減衰波のようなものをつくる
"creat like a decay waveform"

使い方：
最前面のドキュメントの中央左端から疑似減衰波形をつくります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。
曲線のコントロールハンドルの位置に固定しているので
周期と帯域の数値の比率により形状がかわります。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0){
	var doc=app.documents.add();
}
var doc=app.documents[0];
var dWidth=doc.documentPreferences.pageWidth;
var dHeight=doc.documentPreferences.pageHeight;

//ルーラーを一時的にスプレッドにする
var rulerBk=doc.viewPreferences.rulerOrigin;
var rulerTemp=RulerOrigin.SPREAD_ORIGIN;
doc.viewPreferences.rulerOrigin=rulerTemp;

//パラメータ
var periodW = 10;//周期
var bandH   = 20;//帯域
//周期：帯域=5：1　なみなみ
//周期：帯域=2：1　ギザギザ
//周期：帯域=1：1　くりんができてくる
//周期＞帯域　くりんくりん

var decayPer=00;//減衰率（％）0で減衰しない

var periodMin=1;//周期の最小幅
var stepMax=30;//減衰ステップ数の最大
//どちらか先に到達した時点で終了

//開始点
var startPx=0;
var startPy=dHeight/2;

var i=0
var pCo=new Array();//波形の配列をいれていく

while(periodW>periodMin){
pCo.push([[startPx, startPy], 
	[startPx, startPy],
	[startPx+bandH*Math.SQRT1_2, startPy-bandH*Math.SQRT1_2]]);
	
pCo.push([[startPx+periodW/2-bandH*Math.SQRT1_2, startPy-bandH*Math.SQRT1_2],
	[startPx+periodW/2, startPy],
	[startPx+periodW/2+bandH*Math.SQRT1_2, startPy+bandH*Math.SQRT1_2]]);
	
pCo.push([[startPx+periodW-bandH*Math.SQRT1_2, startPy+bandH*Math.SQRT1_2],
	[startPx+periodW, startPy],
	[startPx+periodW, startPy]]);
	
	startPx=startPx+periodW;
	periodW=periodW*(1-decayPer/100);//周期をへらす
	bandH=bandH*(1-decayPer/100);//帯域をへらす
	i++;
	// $.writeln("i="+i+" W="+periodW);
	if(i>=stepMax){break;}
}
waveObj=doc.rectangles.add();//四角形をつくって
waveObj.paths[0].entirePath=pCo;//波形の座標と入れ替える
waveObj.paths[0].pathType=PathType.OPEN_PATH;//オープンパスにする
//いろとか
waveObj.fillColor="None";
waveObj.strokeWeight=0.5;
waveObj.strokeColor="Black";

//ルーラーを元に戻す
doc.viewPreferences.rulerOrigin=rulerBk;