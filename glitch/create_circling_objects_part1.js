/**
ぐりぐり旋回させたものをつくる
"create circling objects"

使い方：
実行すると設定ダイアログがでます。大きさ、内径の比率、旋回数、分割数などを入力。
最前面のドキュメントに、ぐりぐり旋回させたものをつくります。
開いているドキュメントがなければ新規ドキュメントを勝手に作って実行します。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0){
	var doc = app.documents.add();
}
var doc = app.documents[0];

var dWidth = doc.documentPreferences.pageWidth;
var dHeight = doc.documentPreferences.pageHeight;
//ルーラーを一時的にスプレッドにする
var rulerBk = doc.viewPreferences.rulerOrigin;
var rulerTemp = RulerOrigin.SPREAD_ORIGIN;
doc.viewPreferences.rulerOrigin = rulerTemp;

var dialogObj = app.dialogs.add({name:"grigrigrigri", canCancel:true});
with(dialogObj){
	with(dialogColumns.add()){
		with(borderPanels.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "siz"});
			}
			with(dialogColumns.add()){
				var sizeField  =  realEditboxes.add({editValue: 45});
			}
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "inn"});
			}
			with(dialogColumns.add()){
				var minField  =  percentEditboxes.add({editValue: 20, minimumValue:1, maximumValue:99});
			}
		}//min per
		with(borderPanels.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "gri"});
			}
			with(dialogColumns.add()){
				var circleField  =  integerEditboxes.add({editValue: 10});
			}
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "dev"});
			}
			with(dialogColumns.add()){
				var devideField  =  integerEditboxes.add({editValue: 17, minimumValue:3, maximumValue:360});
			}
		}//devide
		with(borderPanels.add()){
	 		with(dialogColumns.add()){
				staticTexts.add({staticLabel: "amm"});
			}
			with(dialogColumns.add()){
				var valueField  =  integerEditboxes.add({editValue: 1});
			}
		}//value
	}
}//dialog

if(dialogObj.show() == true){
	var armMax        = sizeField.editValue/2;//だいたいの半径
	var armMinPer     = minField.editValue;//内側の比率、小さい程あばれる、大きい程外側に集まる
	var circlingValue = circleField.editValue;//ぐるぐる周回する数
	var devPiece      = devideField.editValue;//360°を分割する数
	var creatValue    = valueField.editValue;//作成する数
	dialogObj.destroy();
}
else{
	dialogObj.destroy();
	exit();
}

for(var j = 0; j < creatValue; j++){
	var spiraArray = new Array();//座標を入れる配列
	var pi = 2*Math.PI/360;//角度をラジアンに変換するもの
	var devRadi = pi*(360/devPiece);//1回あたりの移動角度
        
	for(var i = 0; i<devPiece*circlingValue; i++){
		var armR = armMax*armMinPer/100+(armMax*(1-armMinPer/100))*Math.random();
		// こうすると渦巻き風にはなる
		// var armR = armMax*armMinPer/100+(armMax*(1-armMinPer/100))*Math.sin(devRadi*i/64);
		var poN = [armR*Math.sin(devRadi*i), armR*Math.cos(devRadi*i)];
		spiraArray.push(poN);
	}
	var spiraObj = doc.rectangles.add();
	spiraObj.paths[0].entirePath = spiraArray;
	spiraObj.paths[0].pathType = PathType.OPEN_PATH;
	spiraObj.strokeWeight = 0.1;
	spiraObj.strokeColor = "Black";
	spiraObj.fillColor = "None";
	spiraObj.move(undefined, 
		[armMax/2+dWidth*Math.random()-armMax/2, 
		armMax/2+dHeight*Math.random()-armMax/2]);
}
//ルーラーを元に戻す
doc.viewPreferences.rulerOrigin = rulerBk;

