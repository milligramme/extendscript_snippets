/*
ここからここまでバラPDF書き出し
"export PDFs with my range"

使い方：
PDF名にしたい内容が書いてあるテキストフレームにスクリプトラベルをいれておきます。
次のスクリプトラベルが発生するまでの範囲でPDF書き出していきます。
PDF書出しプリセット「Sample」を使用しますので適当に変更してください。

milligramme
www.milligramme.cc
*/
//おまじない
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

//スクリプトラベルとPDF書き出しプリセットを設定
var scriptLbl = "NUMBLE_MARKER";
var pdfPreset = "SAMBEL";

if(app.documents.length == 0){
	alert("open a document and try again");
	exit();
}
var docObj        = app.documents[0];
var pageObj       = docObj.pages;
var myPDFexPreset = app.pdfExportPresets.item(pdfPreset);

//開始・終了位置とPDF名
var startP = new Array();
var endP   = new Array();
var nameP  = new Array();

for(var i=0 ; i < pageObj.length; i++){
//スクリプトラベルのあるテキストフレームが開始位置の配列
	var scrL = pageObj[i].textFrames.itemByName(scriptLbl);
	if(scrL == null){
		continue;
	}
	else {
		nameP.push(scrL.contents.replace(":","_") + ".pdf");
		startP.push(i);
		endP.push(i);
	}
}
//ページが連続する箇所の終了位置を設定
//前にずらして、1ひく、最後に最終ページを追加。
endP.shift();
for(var k=0; k < endP.length; k++){
	endP[k] = endP[k]-1
}
endP.push(pageObj.length);

var myFolder = Folder.selectDialog("Choose a Folder to export");
if(myFolder != null){
	for(j=0; j < startP.length ; j++){
		//"1-3"など書き出し範囲を設定、単ページも"6-6"となるけど大丈夫みたい。
		var pRange = pageObj[startP[j]].name + "-" + pageObj[endP[j]].name;
		app.pdfExportPreferences.pageRange = pRange;
		var myFilePath = myFolder + "/" + nameP[j]
		var myFile = new File(myFilePath);
		docObj.exportFile(ExportFormat.pdfType,myFile,false,myPDFexPreset);
	}
}
alert("completed");