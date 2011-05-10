/**
選択オブジェクトにくしゅくしゅを埋込む
"embed confused pattern to selection"

概要：
選択オブジェクトにくしゅっとします。
フレーム内の入れ子のオブジェクトがある場合は削除して処理します。
画像が配置されたフレームでは処理を中止します。
グループ化されたオブジェクトはダイレクト選択で選べば実行できます。

使い方：
くしゅくしゅを埋め込むグラフィックフレームを選択して実行。
ダイアログに希望する「なんちゃって濃度」を入力して続行。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/

if(app.documents.length > 0&&app.selection.length==1){
	var docObj=app.documents[0];
	var selObj=docObj.selection[0];
	switch (selObj.constructor.name){
		case "Rectangle" :
		case "Polygon" :
		case "Oval" :  childCheck(selObj); break;
		default : alert("対象外オブジェクト")exit();
	}

	var per=prompt("set filled percent %",50);
	if(per==null){exit();}
	else{
		main(docObj, selObj, per);
	}
}

function childCheck(selObj){
		if(selObj.graphics.length==1){
			alert("画像が配置されているので中止します。");
			exit();
			}
		}

function main(docObj, selObj, per){
	var lineThickness=0.1;
	var selGBon=selObj.geometricBounds;
	var offSetMargin=2; //大きめにつくるマージン。マイナス値も可
	var sWidth=selGBon[3]-selGBon[1]+2*offSetMargin;
	var sHeight=selGBon[2]-selGBon[0]+2*offSetMargin;
	//最小限の本数で濃度を出すための計算
	var kushValue=2*Math.floor(per/100*(sWidth*sHeight)/(Math.max(sWidth, sHeight)*lineThickness));
	$.writeln(kushValue)
	if(selObj.pageItems.length==1){
		selObj.pageItems[0].remove()
		}
	var ppArr=new Array();
	for(var i=0; i < kushValue; i++){
		var ran=Math.random();
		var ppList=[[sWidth*ran, 0],[sWidth*ran, sHeight], [0,sHeight*ran],[sWidth,sHeight*ran]]
		var ppPoint=ppList[Math.floor(4*Math.random())];
		ppArr.push(ppPoint);
		//$.writeln(ppPoint)
		}

	var kusObj=docObj.rectangles.add();
	with(kusObj){
		paths[0].entirePath=ppArr;
		kusObj.fillColor="None";
		kusObj.strokeWeight=lineThickness;
		kusObj.strokeColor="Black";
		//kusObj.transparencySettings.blendingSettings.opacity=50;
		}
	kusObj.move ([selGBon[1]-offSetMargin,selGBon[0]-offSetMargin]);
	kusObj.select();
	app.cut();
	selObj.select();
	app.pasteInto();
	}