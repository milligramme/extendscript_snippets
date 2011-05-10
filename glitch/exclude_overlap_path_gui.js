/**
がしゃんと割って、寄せてまた割って固める。みたいなものをつくる
"crash and sweep, crash and stick"

使い方と注意：
実行すると、整列位置、形状（shp）、複製数（dup）、分割値（div）のダイアログが出ます。
適当に設定して、OKすると、最前面ドキュメント（なければ作成）上に、
円か四角形を複製して、パスファインダ（中マド）を実行、
複合パスを解除して、整列させて、もう一度パスファインダ（中マド）を
実行します。

整列位置；最終的にドキュメントのどこに整列させるか、"frozen"の場合は整列させません。
形状（shp）円又は四角形を選ぶ
複製数（dup）円又は四角形を複製する数。多すぎると極端に速度低下するので3〜10にリミット設定してます。
分割値（div）はドキュメントの短編を分割する数。大きいと生成される円又は四角形
が小さくて、中マドが発生しません。

動作確認：OS10.4.11, 10.6.2 InDesign CS3

milligramme
www.milligramme.cc
*/

var dlg = new Window('dialog', 'crash and sweep' , [0, 0, 240, 150]);
dlg.center();

dlg.add('statictext', [90,45,120,59],"val");
var dupValueSlider=dlg.add('slider' , [120, 45, 190, 59] , 5, 2, 10);//min 2, max10, default 5
var dupValueTxt=dlg.add('statictext', [200,45,250,59],"5");

dlg.add('statictext', [90,70,120,84], "div");
var divDocSlider=dlg.add('slider' , [120, 70, 190, 84] , 1.5, 1, 5);//min 1, max 5, default 1.5
var divDocTxt=dlg.add('statictext', [200,70,250,84],"1.5");

dlg.add('statictext', [90,13,120,30], "shp");
var dupShape=dlg.add('dropdownlist' , [120, 10, 230, 27] , ["Rectangle","Oval"]);
dupShape.selection=1; //default: Oval

dlg.add('panel' , [19, 19, 65, 65] , '');
var rbGrp=dlg.add('group',[0,0,100,100]);
with(rbGrp){
	var alignLeftBottom= add('radiobutton' , [10, 56, 28, 74] , '1');
	var alignBottom= add('radiobutton' , [33, 56, 51, 74] , '2');
	var alignRightBottom= add('radiobutton' , [56, 56, 74, 74] , '3');
	var alignLeft= add('radiobutton' , [10, 33, 28, 51] , '4');
	var alignCenter= add('radiobutton' , [33, 33, 51, 51] , '5');
	var alignRight= add('radiobutton' , [56, 33, 74, 51] , '6');
	var alignLeftTop= add('radiobutton' , [10, 10, 28, 28] , '7');
	var alignTop= add('radiobutton' , [33, 10, 51, 28] , '8');
	var alignRightTop= add('radiobutton' , [56, 10, 74, 28] , '9');
	var frozen= add('radiobutton' , [10, 79, 74, 97] , 'frozen');
	}
	alignLeftTop.value=true; //default position: Left Top

var okButton= dlg.add('button' , [40, 115, 100, 130] , 'ok' , {name: 'ok'});
var cancelButton= dlg.add('button' , [120, 115, 200, 130] , 'cancel' , {name: 'cancel'});

// event
okButton.onClick=function(){
	dlg.close();
	okClick=true;
	};
cancelButton.onClick=function(){
	dlg.close();
	okClick=false;
	};
dupValueSlider.onChanging=function(){
	dupValueTxt.text=Math.round(this.value);
	}
divDocSlider.onChanging=function(){
	divDocTxt.text=this.value.toFixed(2);
	}
// end of event

dlg.show();

// set var 
if(okClick==true){
	var RorO= dupShape.selection==0 ? 'rectangles' : 'ovals'; // 四角か円か
	var valueOfShape= Math.round(dupValueSlider.value); //複製数（整数値）
	var divDoc= divDocSlider.value.toFixed(2); //分割値
	var alignMode;
	for(var i=0, L=rbGrp.children.length; i < L; i++){
		if(rbGrp.children[i].value==true){
			alignMode=rbGrp.children[i].text;
			}
		}

	if(app.documents.length==0){
		app.documents.add();
		}
	var docObj=app.documents[0];

	//ルーラーを一時的にスプレッドにする
	var rulerBk=docObj.viewPreferences.rulerOrigin;
	var rulerTemp=RulerOrigin.SPREAD_ORIGIN;
	docObj.viewPreferences.rulerOrigin=rulerTemp;

	//メイン処理へ
	main(docObj, divDoc, alignMode, valueOfShape, RorO);

	//ルーラーを元に戻す
	docObj.viewPreferences.rulerOrigin=rulerBk;
	}
else{exit();}


//メイン処理：
function main (docObj, divDoc, alignMode, valueOfShape, RorO){
	var dWidth=	docObj.documentPreferences.pageWidth;
	var dHeight= docObj.documentPreferences.pageHeight;	
	var dMin=Math.min(dWidth, dHeight);

	var objR=dMin/divDoc;
	var obj=docObj[RorO].add({//[RorO]は.rectangles か .ovals
		geometricBounds: [0, 0, objR, objR], 
		fillColor: "Black", 
		strokeWeight: 0, 
		strokeColor: "None"
		});
	var dupArr=new Array();
	for(var i=0; i < valueOfShape; i++){
		dupObj=obj.duplicate(undefined, [ (dWidth-objR)*Math.random(), (dHeight-objR)*Math.random() ]);
		dupArr.push(dupObj);
		}
	compObj=obj.excludeOverlapPath (dupArr); //パスファインダー中マド
	 
	relCompObj=compObj.releaseCompoundPath();
//	$.bp()
	for(j=0, L= relCompObj.length; j < L; j++){
		var relCompGBon=relCompObj[j].geometricBounds;
		switch (alignMode){
			case "1":
				try{relCompObj[j].move(undefined,[ -relCompGBon[1], dHeight-relCompGBon[2] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "2":
				try{relCompObj[j].move(undefined,[ 0, dHeight-relCompGBon[2] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "3":
				try{relCompObj[j].move(undefined,[ dWidth-relCompGBon[3], dHeight-relCompGBon[2] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "4":
				try{relCompObj[j].move(undefined,[ -relCompGBon[1], 0 ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "5":
				try{relCompObj[j].move(undefined, [ 
					dWidth*0.5-relCompGBon[1]-(relCompGBon[3]-relCompGBon[1])*0.5, 
					dHeight*0.5-relCompGBon[0]-(relCompGBon[2]-relCompGBon[0])*0.5 
					])}
				catch(e){relCompObj[j].remove();}
				break;
			case "6":
				try{relCompObj[j].move(undefined,[ dWidth-relCompGBon[3], 0 ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "7":
				try{relCompObj[j].move(undefined,[ -relCompGBon[1], -relCompGBon[0] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "8":
				try{relCompObj[j].move(undefined,[ 0, -relCompGBon[0] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			case "9":
				try{relCompObj[j].move(undefined,[ dWidth-relCompGBon[3], -relCompGBon[0] ]);}
				catch(e){relCompObj[j].remove();}
				break;
			default :// frozen の場合には整列させない
			}
		}
	relCompObj_1=relCompObj.shift();
	relCompObj_1.excludeOverlapPath (relCompObj);//パスファインダー中マド
	}