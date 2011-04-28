/**
ドキュメントとアプリケーションの単位と増減値をととのえる
"set unit and increment of documents and application"

使い方：
ドキュメントまたはアプリ全体の「単位と増減値」の設定をドロップダウンリストから変更します。

単位は4種類
	座標がmm、組版が級歯
	座標も組版もポイント
	座標がmm、組版が級歯
	座標がパイカ、組版がポイント

これらに合わせて増減値もそれぞれ、mm、ptでキリが良い数値に変更します。

ドキュメントが開いている場合
"apply to most front doc"チェックボックスにチェックされていると
最前面のドキュメントのみに適用します。外すと開いている全てのドキュメントに
適用します。

ドキュメントが開いていない場合
"apply to most front doc"チェックボックスのかわりに、
メッセージが"apply to application global"となりアプリケーション全体の設定を変更します。

動作確認：OS10.6.3 InDesign CS3

milligramme
www.milligramme.cc
*/

if(app.documents.length == 0){
	var targetObj = [];
	targetObj.push(app);
}
else{
	var targetObj = app.documents;
}

//単位いろいろ
var uMM = MeasurementUnits.MILLIMETERS;
var uPt = MeasurementUnits.POINTS;
var uPC = MeasurementUnits.PICAS;//（1パイカ=12ポイント）
var uH  = MeasurementUnits.HA;//歯
var uQ  = MeasurementUnits.Q;


//ダイアログ
var dlg = new Window('dialog','unitswitch',[0,0,200,100]);
	dlg.center();
	dlg.dropdownList = dlg.add('dropdownlist',[10,10,190,30],
		['space: mm / text: QH', 
		'space: pt / text: pt',
		'space: mm / text: pt',
		'space: pc / text: pt']
		);
	dlg.dropdownList.selection = 0;
	if(app.documents.length != 0){
		dlg.applyDocBtn = dlg.add('checkbox',[20,40,200,60],'apply to most front doc.');	
		dlg.applyDocBtn.value = true;
	}
	else{
		dlg.add('statictext',[20,40,200,60],'apply to application global.');	
	}
	dlg.okBtn = dlg.add('button',[60,65,140,88],'ok',{name:'ok'});
	
	dlg.show();

var unitSet = dlg.dropdownList.selection.text;
try{
	var applyDoc=dlg.applyDocBtn.value;
}catch(e){
	var applyDoc = true;
}

var docLength;
if(applyDoc == true){
	docLength=1;
}
else{
	docLength=targetObj.length;
}

for(var i=0; i < docLength; i++){
	//座標がmm、組版が級歯
	if(unitSet=="space: mm/text: QH"){
		with(targetObj[i].viewPreferences){
			//単位と増減値
			//定規の単位（水平方向・垂直方向）
			horizontalMeasurementUnits = uMM;
			verticalMeasurementUnits = uMM;
			//他の単位（組版・テキストサイズ・線幅）
			typographicMeasurementUnits = uH;
			textSizeMeasurementUnits = uQ;
			lineMeasurementUnits = uMM;
			//ポイント/パイカの大きさ（ポイント/インチ）
			pointsPerInch = 72;
			//キーボード増減値（カーソルキー）
			cursorKeyIncrement = "0.1mm";
		}
		with(targetObj[i].textPreferences){
			//キーボード増減値（サイズ/行送り・ベースラインシフト・カーニング）
			leadingKeyIncrement = "0.5H";
			baselineShiftKeyIncrement = "0.5H";
			kerningKeyIncrement = 20;
			}
		}//mm qh

	//座標も組版もポイント
	else if(unitSet=="space: pt/text: pt"){
		with(targetObj[i].viewPreferences){
			horizontalMeasurementUnits=uPt;
			verticalMeasurementUnits=uPt;
			typographicMeasurementUnits=uPt;
			textSizeMeasurementUnits=uPt;
			lineMeasurementUnits=uPt;
			pointsPerInch=72;
			cursorKeyIncrement="0.5pt";
		}
		with(targetObj[i].textPreferences){
			leadingKeyIncrement="0.5pt";
			baselineShiftKeyIncrement="0.5pt";
			kerningKeyIncrement=20;	
		}
	}//pt pt

	//座標がmm、組版がポイント
	else if(unitSet=="space: mm/text: pt"){
		with(targetObj[i].viewPreferences){
			horizontalMeasurementUnits=uMM;
			verticalMeasurementUnits=uMM;
			typographicMeasurementUnits=uPt;
			textSizeMeasurementUnits=uPt;
			lineMeasurementUnits=uPt;
			pointsPerInch=72;
			cursorKeyIncrement="0.1mm";
		}
		with(targetObj[i].textPreferences){
			leadingKeyIncrement="0.5pt";
			baselineShiftKeyIncrement="0.5pt";
			kerningKeyIncrement=20;	
		}
	}//mm pt

	//座標がパイカ、組版がポイント
	else if(unitSet=="space: pc/text: pt"){
		with(targetObj[i].viewPreferences){
			horizontalMeasurementUnits=uPC;
			verticalMeasurementUnits=uPC;
			typographicMeasurementUnits=uPt;
			textSizeMeasurementUnits=uPt;
			lineMeasurementUnits=uPt;
			pointsPerInch=72;
			cursorKeyIncrement="0.5pt";
		}
		with(targetObj[i].textPreferences){
			leadingKeyIncrement="0.5pt";
			baselineShiftKeyIncrement="0.5pt";
			kerningKeyIncrement=20;	
		}
	}//pc pt
}//for i