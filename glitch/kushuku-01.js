/*
くしゅくしゅしたものを作る
"make confused pattern"

使い方：
最前面のドキュメントのサイズいっぱいに、くしゅくしゅした物をつくります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。
kushkushValueをいじると目の細かさをいじれます。

動作確認：OS10.4.11 InDesign CS2、CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length == 0){
	var doc = app.documents.add();
}
var doc = app.documents[0];
var dWidth = doc.documentPreferences.pageWidth;
var dHeight = doc.documentPreferences.pageHeight;

var kushkushValue = 1000;//頂点の数、くしゅくしゅ具合の調整

var coOrdi = new Array();
for(var i = 0; i < kushkushValue; i++){
        //ドキュメントのサイズ内で
        var ranX = dWidth*Math.random();
        var ranY = dHeight*Math.random();
        coOrdi.push([ranX,ranY]);
        }

var pCo = coOrdi;//多角形の座標の配列
var kushObj = doc.rectangles.add();//四角形をつくって
kushObj.paths[0].entirePath = pCo;//多角形の座標と入れ替える
kushObj.fillColor = "None";
kushObj.strokeColor = "Black";
kushObj.strokeWeight = 0.1;
kushObj.strokeTint = -1;
