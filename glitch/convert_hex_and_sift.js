/**
乱数をunicodeに変換して、ふるいにかける
"convert hex to character and sift"

使い方：
実行すると新規ドキュメント上にunicodeの文字の層の描画を試みます。
表示できない字形をグラフィック化でふるいにかけます。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/

var docObj=app.documents.add();
var dH=docObj.documentPreferences.pageHeight;
var dW=docObj.documentPreferences.pageWidth;

for(var j=0; j < 7; j++){
	var tfObj=docObj.textFrames.add({geometricBounds:[10, 10, dH-10, dW-10]});

	for(var i=0; i < 500; i++){
		var randomSrc=""+(Math.random()*1000000000).toString (16);
		var charFour=randomSrc.substr(0, 4);
		var japChar=String.fromCharCode (parseInt("0x"+charFour));
		//$.writeln(japChar);
		var cnt=tfObj.parentStory;
		cnt.contents+=japChar;
		}
	
	cnt.fillTint=Math.min(30+10*(j+1), 100);
	cnt.pointSize=12*(j+1);
	tfObj.select();
	tfObj.createOutlines();
	}