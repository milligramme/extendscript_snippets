/*
もじゃもじゃ又はちくちくしたものを作る
"make prickly or hairy objects"

使い方：
最前面のドキュメントのサイズいっぱいに、円形のもじゃもじゃしたものをつくります。
もじゃもじゃオプションをfalseにするとちくちくになります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length == 0){
	var doc = app.documents.add();
}
var doc = app.documents[0];

var dWidth  = doc.documentPreferences.pageWidth;
var dHeight = doc.documentPreferences.pageHeight;

var lineL       = 30;//もじゃもじゃの半径
var lineW       = 0.2;//もじゃもじゃの細さ
var lineValue   = 90;//もじゃもじゃ具合
var mojaKoValue = 1;//もじゃもじゃしたものの数
var mojaORchiku = true;//trueでもじゃもじゃ、falseでちくちく

for(var i=0; i<mojaKoValue; i++){
	var mj=new Array();
	for(var ke=0; ke < lineValue; ke++){
		var deg = 360*Math.random();
		if(mojaORchiku == true){//もじゃもじゃ
			pCo = [//円の中心で方向線をランダムにひっぱる
			[
			[lineL*(Math.pow(-1,Math.round(Math.random())))*Math.random(),
			 lineL*(Math.pow(-1,Math.round(Math.random())))*Math.random()],
			[0,0],
			[lineL*(Math.pow(-1,Math.round(Math.random())))*Math.random(),
			 lineL*(Math.pow(-1,Math.round(Math.random())))*Math.random()]],
			[lineL*Math.cos(deg),lineL*Math.sin(deg)]//円の周りは方向線は持たないアンカーポイント
			];
			}
		else{//ちくちく
			pCo = [
				[0,0],
				[lineL*Math.cos(deg),lineL*Math.sin(deg)]//円の周り
			];
		}
		mojaObj = doc.graphicLines.add();
		mojaObj.paths[0].entirePath = pCo;
		mojaObj.paths[0].pathType = PathType.OPEN_PATH;
		mojaObj.fillColor == "None";
		mojaObj.strokeColor = "Black";
		mojaObj.strokeWeight = lineW;
		//mojaObj.rightLineEnd=ArrowHead.CIRCLE_ARROW_HEAD;
		mojaObj.endCap = EndCap.ROUND_END_CAP;//先っぽは丸く
		mj.push(mojaObj);
	}
	var mojaKo = doc.groups.add(mj);
	mojaKo.move([(dWidth-lineL*2)*Math.random(),(dHeight-lineL*2)*Math.random()]);
}
