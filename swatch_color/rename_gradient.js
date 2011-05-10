/**
グラデーションスウォッチをリネーム
"rename gradient swatches's name"

使い方：
グラデーションスウォッチがあるドキュメントで実行します。

ドキュメント上のグラデーションスウォッチをグラデーションストップの
カラー値をもとにリネームします。
ポジション、ミドルポイントまでは面倒みません。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/

var docObj = app.documents[0];
var swObj  = docObj.swatches;

for(var i=0; i < swObj.length; i++){
	if(swObj[i].getElements()[0].constructor.name == "Gradient"){
		//グラデーションならば各グラデーションスウォッチの色をしらべる
		var grdType;
		if(swObj[i].type == GradientType.LINEAR){
			grdType = "GL: ";
		}
		else{
			grdType = "GR: ";
		}
		var grdStop = swObj[i].gradientStops;
		//ストップカラーを入れる配列をつくる
		var gradNameArr = new Array();
		//ストップカラーの色名を配列に入れていく
		var ccText; 
		for(var j=0; j < grdStop.length; j++){
			var stpColor = grdStop[j].stopColor;
			if(stpColor.constructor.name == "Tint"){//濃度スウォッチのとき
				ccText = "[" + stpColor.name + "]";
				gradNameArr.push(ccText);
			}
			else if(stpColor.constructor.name=="Color"){//CMYKのとき
				if(stpColor.name == "Black" || stpColor.name == "Paper"){//[黒]と[紙色]だけ名前に
					ccText = "[" + stpColor.name + "]";
				}
				else{
					ccText = CMYK2TXT (stpColor.colorValue);
				}
				gradNameArr.push(ccText);
			}
		}// for j
		//ストップカラー配列をテキストに変換して、ちょっと置換
		var swNameList = gradNameArr.toString().replace(/\,/g ,"／");
		//書き換える	 
		try{
			swObj[i].name = grdType + swNameList;
		}
		catch(e){
			k = 1;
			swObj[i].name = UQName(swObj, grdType + swNameList, k);
		}
	}// if gradient swatch
}// for i

//CMYK値をテキストににする
function CMYK2TXT(cmyk){
	if(cmyk == "0,0,0,0"){return "White"}
	if(cmyk == "0,0,0,100"){return "Black"}

	var cTex = "", mTex = "", yTex = "", kTex = ""; 
	if(cmyk[0] != 0){var cTex = "C" + cmyk[0].toFixed(0)+"";}
	if(cmyk[1] != 0){var mTex = "M" + cmyk[1].toFixed(0)+"";}
	if(cmyk[2] != 0){var yTex = "Y" + cmyk[2].toFixed(0)+"";}
	if(cmyk[3] != 0){var kTex = "K" + cmyk[3].toFixed(0)+"";}
	return cTex + mTex + yTex + kTex;
}

//スウォッチ名チェック、重複するなら「-連番」処理
function UQName(swObj, string, k){
	if(swObj.item(string+"-"+k)==null){
		return string+"-"+k;
		}
	else{
		k++; 
		return UQName(swObj, string, k)
		}
	}