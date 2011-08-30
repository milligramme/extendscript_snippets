/**
筆書きのように線をふとらせる

使い方：
ドキュメント上の線または楕円、四角形、多角形などを選んで実行（複数可能）。
できるだけ3点以上で構成された図形の方が効果的。
パスを複製してランダムな太さの線のようなものにします。

*/
//パラメーター
//太さの目安、複製したパスの移動量（ランダム）
var aBurrenBow=3;

var selObj = app.selection;
for (var i = 0; i < app.selection.length; i++){

	var dupObj = selObj[i].duplicate();
	
	//パスを閉じて、両端をとんがらせる
	selObj[i].paths[0].pathType = PathType.CLOSED_PATH;
	selObj[i].paths[0].pathPoints[0].pointType = PointType.LINE_TYPE;
	selObj[i].paths[0].pathPoints[-1].pointType = PointType.LINE_TYPE;

	//パスポイントが3以上なら始点と終点を削除
	if(dupObj.paths[0].pathPoints.length >= 3){
		dupObj.paths[0].pathPoints[0].remove();
		dupObj.paths[0].pathPoints[-1].remove();
	}

	var dupRevArray = new Array();
	for(j=dupObj.paths[0].pathPoints.length-1; j >= 0; j--){
		var dupRevPathPoint;
		//スムースならばコントロールハンドルも反転
		if(dupObj.paths[0].pathPoints[j].pointType == PointType.SMOOTH){
			dupRevPathPoint = [
			randomMove(dupObj.paths[0].pathPoints[j].rightDirection, aBurrenBow),
			randomMove(dupObj.paths[0].pathPoints[j].anchor, aBurrenBow),
			randomMove(dupObj.paths[0].pathPoints[j].leftDirection, aBurrenBow)
			]
		}
		else{
			dupRevPathPoint =
			randomMove(dupObj.paths[0].pathPoints[j].anchor, aBurrenBow);
		}
		//パスの配列を反転していく
		dupRevArray.push(dupRevPathPoint);
	}
	//ひっくり返した複製パス配列を元のパス配列と結合して入れ替える。
	var jointArray=selObj[i].paths[0].entirePath.concat(dupRevArray);
	selObj[i].paths[0].entirePath=jointArray;

	//線に色があればその色にします。なければ［黒］に
	if(selObj[i].strokeWeight != 0){
		var currentStrColor = selObj[i].strokeColor;
		selObj[i].fillColor = currentStrColor;
		selObj[i].strokeColor = "None";
	}
	else{
		selObj[i].fillColor = "Black"
	}
	dupObj.remove();
}

function randomMove(anch,dim){
	x = anch[0]-dim+2*dim*Math.random();
	y = anch[1]-dim+2*dim*Math.random();
	return [x, y]
}