/**
選択オブジェクトの総当たり線を引く
"draw brute lines of selected path"

使い方：
パスオブジェクトを選択して実行、総当たり線の総数を確認しますのでよければ続行。
一番目のパスのアンカーを総当たりでつないだ図形を描きます。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0 && app.selection.length==0){exit();}

var selObj=app.selection[0];
switch(selObj.constructor.name){
	case "Polygon":
	case "Rectangle":
	case "Oval":
	case "TextFrame": break;
	default: exit();
	}
var selPathPointWithHandle=selObj.paths[0].pathPoints;

//コントロールハンドルを無視
var selPathPointArr=new Array();
for(var p=0; p < selPathPointWithHandle.length ;p++){
	selPathPointArr.push(selPathPointWithHandle[p].anchor);
}

//総当たりの総数を表示、多くても続行する？な処理
var brute=0;
for(var a=1; a < selPathPointArr.length-1; a++){
	brute+=selPathPointArr.length-a;
	}
$.localize = true;
var precheck　=　{ja: brute+"本の総当たり線を引きます、続行してもいいですか?", en: "draw brute lines of "+brute+" , ok to continue?"};
var cont　=　confirm(precheck);
if(cont　==　false){
	alert({ja:"中止しました。",en:"canceled"});
	exit();
}

var groupArr=new Array();
//総当たりな線を描く。あとでグループ化
for(var i=0; i < selPathPointArr.length; i++){
	for(var j=1; j < selPathPointArr.length-i; j++){
		var lineObj=selObj.parent.parent.pages.itemByName (selObj.parent.name).graphicLines.add();
		with(lineObj){
			strokeWeight=0.1;
			strokeColor="Cyan";
			paths[0].pathPoints[0].anchor=selPathPointArr[i];
			paths[0].pathPoints[1].anchor=selPathPointArr[i+j];
			}
		groupArr.push(lineObj);
		}
	}
selObj.parent.parent.pages.itemByName(selObj.parent.name).groups.add(groupArr);