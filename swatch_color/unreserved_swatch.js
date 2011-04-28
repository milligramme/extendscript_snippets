var doc_obj = app.documents[0];
un = unReservedSwatch(doc_obj);
if (un == undefined){exit();}

for(var i=0; i < un.length; i++){
	var rec = doc_obj.rectangles.add();
	rec.geometricBounds = [0,0,10,10];
	rec.move("undefined",[200 * Math.random(), 287 * Math.random()]);
	rec.fillColor = doc_obj.swatches.itemByName(un[i]);
}
//［なし］［紙色］［黒］［レジストレーション］以外のスウォッチがあれば、スウォッチ名の配列を返す。
function unReservedSwatch(doc){
	var swatch_obj = doc.swatches;
	var otherSwList = [];
	if(swatch_obj.length-4 > 0){
		for(var i = 0; i < swatch_obj.length; i++){
			switch(swatch_obj[i].name){
				case "None":
				case "Paper":
				case "Black":
				case "Registration": 
					break;
				default : 
					otherSwList.push (swatch_obj[i].name);
			}
		}
	}
return otherSwList
}