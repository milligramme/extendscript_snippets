/**
抽き出し線をくりんとまるめる
"convert linear line to swirling curve"

使い方：
ドキュメント上の線または多角形を選んで実行（複数可能）。
オブジェクトの1番目の線をくりんとした曲線に変換します。
開始点から終了点みて右側にくりんをつくります。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/

var selObj = app.selection;
var pi     = Math.PI/180; //degree to radian
	
for (var i=0; i < selObj.length; i++){
	//線と多角形のみを対象に。
	if(selObj[i].constructor.name != "GraphicLine" && selObj[i].constructor.name != "Polygon"){continue}
	//多角形のうち孤立点は除外
	if(selObj[i].paths[0].pathPoints.length < 2) {continue}
	//開始点と終了点（2番目の点）の座標
	var stAnch = selObj[i].paths[0].pathPoints[0].anchor;
	var enAnch = selObj[i].paths[0].pathPoints[1].anchor;
	//中間点の位置の比率。固定値かランダムか
	//var ratioMid = 0.5;
	var ratioMid   = (30+40*Math.random())/100;// 30〜70％の範囲でランダム
	
	//開始点と終了点間の角度
	var theta;
	if(enAnch[0]-stAnch[0] == 0 && enAnch[1] > stAnch[0]){
		theta = 90;
	}
	else if(enAnch[0]-stAnch[0] == 0 && enAnch[1] < stAnch[0]){
		theta = -90;
	}
	else{
		theta = Math.atan2(enAnch[1]-stAnch[1], enAnch[0]-stAnch[0])/pi;
	}
	// $.writeln(theta);
	//開始点と終了点の距離
	var selDist = Math.sqrt (Math.pow(enAnch[0]-stAnch[0], 2)+Math.pow(enAnch[1]-stAnch[1], 2));

	//中間点の座標
	var midAnch = [stAnch[0]+(enAnch[0]-stAnch[0])*ratioMid, stAnch[1]+ (enAnch[1]-stAnch[1])*ratioMid];

	//開始点からみて右側にくりんをつくる
	//ベジェ曲線のコントロールハンドルの座標
	var stHandle = enHandle = [midAnch[0]+Math.cos((theta+90)*pi)* selDist*ratioMid , midAnch[1]+Math.sin((theta+90)*pi)*selDist*ratioMid];
	var midHndL = [midAnch[0]+(enAnch[0]-midAnch[0])/2, midAnch[1]+(enAnch[1]-midAnch[1])/2];
	var midHndR = [stAnch[0]+(midAnch[0]-stAnch[0])/2, stAnch[1]+(midAnch[1]-stAnch[1])/2];

	//くりンとした曲線のための新しい座標の配列を直線のと入れ替える
	var nwPath = [[stAnch, stAnch,stHandle],[midHndL,midAnch, midHndR],[enHandle, enAnch, enAnch]];
	selObj[i].paths[0].entirePath=nwPath;
}
