var docObj = app.documents[0]
var docW = docObj.documentPreferences.pageWidth;
var docH = docObj.documentPreferences.pageHeight;

var max = prompt("A4サイズで2500くらいで真っ黒っぽくなってきます。",1000);
if(max == null){exit();}

var kushArr = new Array();
for(var i = 0; i < max; i++){
	var xFix = docW*Math.round(Math.random());
	var yFix = docH*Math.round(Math.random());
	var pon = [[xFix, docH*Math.random()], [docW*Math.random(), yFix]];

	kushArr.push(pon[Math.round(Math.random())]);
	}

var kushObj = docObj.rectangles.add();
kushObj.paths[0].entirePath = kushArr;
kushObj.fillColor = "None";
kushObj.strokeWeight = "0.1";
kushObj.strokeColor = "Black";
