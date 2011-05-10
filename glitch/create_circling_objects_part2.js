/**
ぐりぐり旋回させたものをつくる-その2
"create circling objects part2"

使い方：
実行すると設定ダイアログがでます。
外円の半径、内円の半径、内々円の半径、旋回数、旋回角度などを入力。
最前面のドキュメントに、ぐりぐり旋回させたものをつくります。
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

var dialogObj=app.dialogs.add({name:"grigrigrigri2", canCancel:true});
with(dialogObj){
	with(dialogColumns.add()){
		with(borderPanels.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "L"});
				}
			with(dialogColumns.add()){
				var sizeLField = realEditboxes.add({editValue: 45});
				}
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "M"});
				}
			with(dialogColumns.add()){
				var sizeMField = realEditboxes.add({editValue: 13});
				}
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "S"});
				}
			with(dialogColumns.add()){
				var sizeSField = realEditboxes.add({editValue: 12});
				}
			}
		with(borderPanels.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "gri"});
				}
			with(dialogColumns.add()){
				var circleField = integerEditboxes.add({editValue:14});
				}
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "rad"});
				}
			with(dialogColumns.add()){
				var devideField = angleEditboxes.add({editValue: 3, minimumValue:1, maximumValue:120});
				}
			}
		with(borderPanels.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "amo"});
				}
			with(dialogColumns.add()){
				var valueField = integerEditboxes.add({editValue: 1});
				}
			}
		}
	}//dialog

if(dialogObj.show()==true){
	var motherArm   = sizeLField.editValue;//外側の円の半径
	var childArm    = sizeMField.editValue;//内側の円の半径
	var childFinger = sizeSField.editValue;//内側の円の中のポイントの位置
	var motherRad   = devideField.editValue;//旋回角度
	var circling    = circleField.editValue;//旋回する回数
	var creatValue  = valueField.editValue;//作成する数
	}
else{
	dialogObj.destroy();
	exit();
	}
var pi=Math.PI/180;
for(var j=0; j<creatValue; j++){
var spiroArray=new Array();

var childRad=motherArm/childArm*motherRad;

for(var i=0; i<circling*360/motherRad; i++){
	var childCenter=[
			(motherArm-childArm)*Math.sin(i*motherRad*pi),
			(motherArm-childArm)*Math.cos(i*motherRad*pi)
			];
			
	var childFingerPoint=[
			childCenter[0]+childFinger*Math.sin(i*childRad*pi),
			childCenter[1]+childFinger*Math.cos(i*childRad*pi)
			];
	spiroArray.push(childFingerPoint);
	}

spiroObj=doc.rectangles.add();
spiroObj.paths[0].entirePath=spiroArray;
spiroObj.paths[0].pathType=PathType.OPEN_PATH;
spiroObj.strokeWeight=0.1;
spiroObj.strokeColor="Black";
spiroObj.fillColor="None";
spiroObj.move(undefined, [motherArm+dWidth*Math.random()-motherArm, motherArm+dHeight*Math.random()-motherArm]);
}
//ルーラーを元に戻す
doc.viewPreferences.rulerOrigin=rulerBk;