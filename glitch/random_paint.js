/*
.inddドキュメント、.aseファイルから
カラー・スウォッチを読み込み、RGBならCMYK変換、スウォッチ名もCMYKに
（して、選択中のオブジェクトがあればランダムに塗り）
"import swatches and convert cmyk"


動作確認：OS10.4.11 InDesign CS3

milligramme(mg)
www.milligramme.cc
*/      
if(app.documents.length != 0){
var docObj = app.documents[0];
/*
var importSwatchFile=File.openDialog (".inddドキュメントまたは.aseファイル（Adobe Swatch Exchage file）を選択","");
if(importSwatchFile!=null){
docObj.loadSwatches (importSwatchFile);
}
//RGBスウォッチをCMYKに*/
var swObj = docObj.swatches;
/*
var colorObj=docObj.colors;
for(var i=0; i<swObj.length; i++){
	//スウォッチの内容が[なし]とグラデーション以外を処理
	//getElements()の配列から
	//[なし]はSwatch、グラデーションはGradientをかえしてくる
	if(swObj[i].getElements()[0].constructor.name=="Color"){
		var colorOfSwatch=colorObj.itemByName(swObj[i].name);
		if(colorOfSwatch.space==ColorSpace.RGB){
			//CMYK変換
			colorOfSwatch.space=ColorSpace.CMYK;
			var CMYK=colorOfSwatch.colorValue;
			//RGB→CMYK変換の変換誤差をまるめる
			var textC=parseInt(CMYK[0]).toString();
			var textM=parseInt(CMYK[1]).toString();
			var textY=parseInt(CMYK[2]).toString();
			var textK=parseInt(CMYK[3]).toString();
			//名前を「カラー値を持つ名前」にする、既にある場合にはママ
			try{
			colorOfSwatch.name="C="+textC+" M="+textM+" Y="+textY+" K="+textK;
			}catch(e){}
			//CMYK値を調整
			var intCMYK=[eval(textC),eval(textM),eval(textY),eval(textK)];
			swObj[i].colorValue=intCMYK;
			}
		}//if not None&Gradient
	}//for swatch convert
*/
//選択しているオブジェクトがあれば、それに現在のスウォッチからランダムに塗ります
var selObj = app.selection;
if(selObj.length > 0){
	var fillColorOk = confirm ("選択中のオブジェクトを現在のスウォッチからランダムに塗ってもいいですか")
	if(fillColorOk == true){
		for(var j=0; j<selObj.length; j++){
			//スウォッチの上位4つが[なし]、[紙色]、[黒]、[レジストレーション]  になっている前提で、それらを除外
			if(swObj.length>4){
				var swatchIndex=4+Math.round(Math.random()*(swObj.length-5));
				selObj[j].fillColor=swObj[swatchIndex];
			}
		}
		alert("おわりんこ");
		}
	}//蛇足ここまで
}//if document exist

