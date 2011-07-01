/*
ぎゅーんとしたものを作る
"create gathering pattern"

使い方：
最前面のドキュメントのサイズいっぱいに、左上のあたりからぎゅーんとしたものをつくります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。
goonValueをいじると目の細かさをいじれます。

動作確認：OS10.4.11 InDesign CS2、CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0){
        var doc=app.documents.add();
        }
var doc=app.documents[0];
var dWidth=doc.documentPreferences.pageWidth;
var dHeight=doc.documentPreferences.pageHeight;

var goonValue=1100;//頂点の数、ちくちくした方の数

var coOrdi=new Array();
for(var i=0; i<goonValue; i++){
	//ドキュメントのサイズ内で
	var ranXL=55;
	var ranYL=32;
	var ranXR=82;
	var ranYR=212;
	var ranX=dWidth*Math.random();
	var ranY=dHeight*Math.random();
	coOrdi.push([[ranXL,ranYL],[ranX,ranY],[ranXR,ranYR]]);
    }

var pCo=coOrdi;//多角形の座標の配列
var goonObj=doc.rectangles.add();//四角形をつくって
goonObj.paths[0].entirePath=pCo;//多角形の座標と入れ替える
goonObj.fillColor="None";
goonObj.strokeColor="Black";
goonObj.strokeWeight=0.1;
goonObj.strokeTint=-1;

