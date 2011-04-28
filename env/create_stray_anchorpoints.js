#target 'InDesign'
//generate stray anchor points
//for test to remove stray anchor points with scripting

var doc_obj = app.documents[0];
var page_obj = doc_obj.pages;

for(var pg=0; pg < page_obj.length; pg++){
	var grp = [];
	for(var i=0; i < 100; i++){
		var poi = page_obj[pg].graphicLines.add();
		poi.paths[0].pathPoints[1].remove();
		poi.move([
			doc_obj.documentPreferences.pageWidth * Math.random() , 
			doc_obj.documentPreferences.pageHeight * Math.random()
			])
		if(i%20 == 0){grp.push(poi);}
	}
	page_obj[pg].groups.add(grp);
}