/*
くしゅくしゅをぱらぱらする
"curly hair children"

使い方：
最前面のドキュメントのサイズいっぱいに（多少はみ出ます）、
ぽこぽことランダムにくしゅくしゅを描きます。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

動作確認：OS10.4.11 InDesign CS2、CS3

milligramme
www.milligramme.cc
*/

var childValue     = 50;//子供達の数
var childKushValue = 15;//子供のくしゅくしゅ具合
var childMin       = 50;//子供の大きさの最小値
var childMax       = 70;//子供の大きさの最大値、乱数でランダムに

if(app.documents.length==0){
	var doc=app.documents.add();
	}
var doc=app.documents[0];
var dWidth=doc.documentPreferences.pageWidth;
var dHeight=doc.documentPreferences.pageHeight;

var coOrdi=new Array();
for(var i=0; i<childValue; i++){
	//ドキュメントのサイズ内で
	var ranX=dWidth*Math.random();
	var ranY=dHeight*Math.random();
	var faceSize=childMin+childMax*Math.random();//最小値〜最大値でランダムなサイズ
	var childObj=doc.ovals.add();//子供の顔をつくって
	childObj.geometricBounds=[ranY,ranX,ranY+faceSize,ranX+faceSize];//座標を移動、大きさを決める
	childFace(childObj);
	}

function childFace(targetObj){
var coOrdi=new Array();
for(var ii=0; ii<childKushValue; ii++){
	var ranXL  = ranX+faceSize*Math.random();
	var ranYL  = ranY+faceSize*Math.random();
	var ranXR  = ranX+faceSize*Math.random();
	var ranYR  = ranY+faceSize*Math.random();
	var childX = ranX+faceSize*Math.random();
	var childY = ranY+faceSize*Math.random();
	coOrdi.push([[ranXL,ranYL],[childX,childY],[ranXR,ranYR]]);
	}
var pCo=coOrdi;//多角形の座標の配列
targetObj.paths[0].entirePath=pCo;//多角形の座標と入れ替える
targetObj.fillColor="None";
targetObj.strokeColor="Black";
targetObj.strokeWeight=0.1;
targetObj.strokeTint=-1;
}