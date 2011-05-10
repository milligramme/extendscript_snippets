/*
ざわざわしたものをつくる
"create thing like voice wave"

使い方：
最前面のドキュメントにギザギザした波形をランダムにひとつ作ります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

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
var devider=40;//波形の細かさ多い程細かくなります

var loopPI=1+Math.round(4*Math.random());//1〜5周期でランダム
var boost=loopPI*2.5;

var zawaAr=new Array();
for(var x=0; x<360*loopPI; x+=360/devider){
	
var garagara=Math.round(Math.random()*10);//0〜10のランダムのうち0〜5に波形割当
switch(garagara){
	case 0: zawaAr.push([x/boost, boost*Math.sin(Math.sin(x/360*2*Math.PI))]); break;
	case 1: zawaAr.push([x/boost, boost*Math.asin(Math.sin(x/360*2*Math.PI))]); break;
	case 2: zawaAr.push([x/boost, boost*Math.cos(Math.sin(x/360*2*Math.PI))]); break;
	case 3: zawaAr.push([x/boost, boost*Math.acos(Math.sin(x/360*2*Math.PI))]); break;
	case 4: zawaAr.push([x/boost, boost*Math.tan(Math.sin(x/360*2*Math.PI))]); break;
	case 5: zawaAr.push([x/boost, boost*Math.atan(Math.sin(x/360*2*Math.PI))]); break;
	default: zawaAr.push([x/boost,0]); break;//6〜10は無音
	}
	}

zawaObj=doc.rectangles.add();
with(zawaObj){
	paths[0].entirePath=zawaAr;
	paths[0].pathType=PathType.OPEN_PATH;
	strokeWeight=0.1;
	strokeColor="Magenta";
	fillColor="None";
	}
zawaObj.move([dWidth/2*Math.random(),dHeight*Math.random()]);

//ルーラーを元に戻す
doc.viewPreferences.rulerOrigin=rulerBk;