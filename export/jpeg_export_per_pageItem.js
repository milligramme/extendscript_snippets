var doc = app.documents[0];
var page = doc.pages;

with(app.jpegExportPreferences){

	jpegExportRange    = ExportRangeOrAllPages.EXPORT_ALL;
	jpegQuality        = JPEGOptionsQuality.MAXIMUM;
	jpegRenderingStyle = JPEGOptionsFormat.BASELINE_ENCODING;
	resolution         = 200;
	//jpegExportRangeがALLでないと無視される
	exportingSpread    = true;
	pageString         = "188";
	}

var imgFolder = Folder.selectDialog("choose target folder");
if(!imgFolder){
	exit();
}
//var imgFolder_fs=new File(imgFolder).fsName;
for(var i=0; i < page.length; i++){
	var fileObj = new File (imgFolder + "/" + page[i].pageItems[0].graphics[0].itemLink.name + ".jpg");

	// $.writeln(fileObj)
	if(fileObj){
		page[i].pageItems[0].exportFile(ExportFormat.JPG, fileObj, false);
	}
/*	try{
		page[i].exportFile(ExportFormat.JPG, fileObj, false);
		}
	catch(e){$.writeln("alone");}*/
	//doc.exportFile(ExportFormat.JPG, fileObj, false)
}
