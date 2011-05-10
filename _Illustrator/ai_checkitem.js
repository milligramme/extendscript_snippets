checkObj = app.activeDocument;
CR = String.fromCharCode(13);
result = "";
for (i in checkObj)
{
	try {	result = result + i+" = "+checkObj[i] + CR; }
	catch(e){ result = result + CR; }
}
pageObj = app.documents.add();
txtObj = pageObj.textFrames.add();
txtObj.visibleBounds = ["2cm","2cm","27cm","19cm"];
txtObj.contents = result;

