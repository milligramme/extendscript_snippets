//Indesign Just now
//裏処理で新規ドキュメントを作成します。
var doc = app.documents.add(false);

//ドキュメント設定
doc.documentPreferences.pageWidth = 150;
doc.documentPreferences.pageHeight = 150;
doc.documentPreferences.facingPages = false;
doc.documentPreferences.pagesPerDocument = 300; //1-9999
doc.viewPreferences.rulerOrigin = RulerOrigin.SPREAD_ORIGIN;

var dSize = Math.min(doc.documentPreferences.pageWidth, doc.documentPreferences.pageHeight);
var pageCount = doc.documentPreferences.pagesPerDocument
var pageObj = doc.pages;

//ドキュメントのページ数を設定して、その中でループさせる。
for (var pg = 0; pg < pageCount; pg++){
	var timeObj =  new Date();//いま！
	var h = timeObj.getHours();
	var m = timeObj.getMinutes();
	var s = timeObj.getSeconds();

	pi = Math.PI/180;//角度をラジアンに

	//3時から始まるので-90°する。
	var hRadian = (h/12*360 + m/60*360/12 - 90) * pi;
	var mRadian = (m/60*360 + s/60*360/60 - 90) * pi;
	var sRadian = (s/60*360 - 90) * pi;
	
	//盤の大きさ、針の長さ
	var baseL = dSize/2 * 0.6;
	var hL = baseL * 0.5;
	var mL = baseL * 0.75;
	var sL = baseL * 0.8;
	
	//盤と針
	var ov = pageObj[pg].ovals.add();
	ov.visibleBounds = [0,0,2*baseL,2*baseL];
	ov.convertShape (ConvertShapeOptions.CONVERT_TO_POLYGON, 60, 0);

	var houN = pageObj[pg].graphicLines.add()
	houN.paths[0].entirePath = [[baseL, baseL],[hL*Math.cos(hRadian)+baseL,hL*Math.sin(hRadian)+baseL]];

	var minN = pageObj[pg].graphicLines.add()
	minN.paths[0].entirePath = [[baseL, baseL],[mL*Math.cos(mRadian)+baseL,mL*Math.sin(mRadian)+baseL]];

	var secN =pageObj[pg].graphicLines.add()
	secN.paths[0].entirePath = [[baseL, baseL],[sL*Math.cos(sRadian)+baseL,sL*Math.sin(sRadian)+baseL]];

	//グループ化させてセンターに
	var grN = doc.pages[pg].groups.add([ov, houN, minN, secN]);
	grN.move([dSize/2 - baseL, dSize/2- baseL]);
	var sels = grN.allPageItems;
	//グループ化解除
	grN.ungroup();
	
	//パーツごとにぐりぐりする。
	for (var i = sels.length-1; i >= 0 ; i--) {
		var vSpeed = Math.min(1 + s, dSize/10); //仮想移動速度。ちいさい程、分割数が多くなる（ステップ数が増える）
		var childArm = Math.min(1 + m, dSize/20) ; //だいたいの太さ
		var degreePerCount = 1 + h + Math.random() * 90; //ぐるぐると360°を分割してまわる角度
		var childRandom = true;//true げじげじ、 false ぐるぐる
	
		grin (doc, sels[i], vSpeed, childArm, degreePerCount, childRandom);
		sels[i].remove();
		}// eof sels
	}// eof page

//裏方処理をしたなら、表に出す。
if(doc.visible == false){doc.windows.add();}

//オブジェクトの線分をパスポイントに分割
function grin (doc, sel, vSpeed, childArm, degreePerCount, childRandom) {
	var page = doc.pages.itemByName(sel.parent.appliedSection.name + sel.parent.name);
	moArray = new Array();
	var startPoint, endPoint, moArr;
	for(var p = 0; p < sel.paths[0].pathPoints.length-1; p++){
		if(p < sel.paths[0].pathPoints.length-1){
			startPoint=sel.paths[0].pathPoints[p].anchor;
			endPoint=sel.paths[0].pathPoints[p+1].anchor;
			}
		moArr = getLocus(startPoint, endPoint, vSpeed);
		}
	if(sel.paths[0].pathType == PathType.CLOSED_PATH){
		startPoint = sel.paths[0].pathPoints[-1].anchor;
		endPoint = sel.paths[0].pathPoints[0].anchor;
		}
	moArr = getLocus(startPoint, endPoint, vSpeed);
	grinPlace(page, moArr, childArm, degreePerCount, childRandom);
}

//移動中の座標を取得して配列に追加していく
function getLocus(start, end, vSpeed){
	var selW = end[0]-start[0];
	var selH = end[1]-start[1];

	//アンカー間の距離と傾き
	var selDist = Math.sqrt (Math.pow(selW,2) + Math.pow(selH,2));
	var selRad = Math.atan(selH / selW);

	//移項（xの負の方向への移動のとき）
	var aljabr;
	if(selW < 0){aljabr = -1;}
	else{aljabr = 1;}

	//設定した間隔で座標を取得
	for(var i = 0; i < selDist/vSpeed; i++){
		var moX = start[0] + aljabr*vSpeed*i*Math.cos(selRad);
		var moY = start[1] + aljabr*vSpeed*i*Math.sin(selRad);

		moArray.push([moX, moY]);
		}
	//端数で終端に達しなかった時
	if(moArray[-1] != end){
		moArray.push(end);
		}
	return moArray;
}

//ぐりぐりを生成
function grinPlace(page, array, arm, degree, random){
	var chiArray = new Array();
	var childX, childY;
	for(var j = 0; j < array.length; j++){
		for(var k = 0; k < 360/degree; k++){
			if(random == true){
				childX = array[j][0] + arm*Math.cos(pi*degree*k)*Math.random();
				childY = array[j][1] + arm*Math.sin(pi*degree*k)*Math.random();
				}
			else{
				childX = array[j][0] + arm*Math.cos(pi*degree*k);
				childY = array[j][1] + arm*Math.sin(pi*degree*k);
				}
			chiArray.push( [childX, childY] );
			}
		}
		var chiObj = page.rectangles.add();
		chiObj.paths[0].entirePath = chiArray;
		chiObj.paths[0].pathType = PathType.OPEN_PATH;
		chiObj.fillColor = "None";
		chiObj.strokeWeight = 0.5;
		var clrArr = ["Black", "Cyan", "Magenta", "Yellow"];
		chiObj.strokeColor = clrArr[Math.floor(Math.random()*(clrArr.length-1))];
		chiObj.strokeTint = 50 + Math.random()*50;
}
