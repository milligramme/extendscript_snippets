var doc = app.documents[0];
var sel = doc.selection[0];
exportJepgSelection (sel);

function exportJepgSelection (target) {
  with(app.jpegExportPreferences){
    jpegExportRange = ExportRangeOrAllPages.EXPORT_RANGE;
    jpegQuality = JPEGOptionsQuality.MAXIMUM;
    jpegRenderingStyle = JPEGOptionsFormat.BASELINE_ENCODING;
    resolution = 150;
    exportingSpread = false;
    }
  imgFolder = new Folder("~/Desktop/" + new Date().getTime());
  imgFolder.create();
  if(imgFolder){
    fileObj = new File (imgFolder + "/a" + ".jpg");//なにかprefixがないとdot fileの .jpgが生成されてしまう
    if(fileObj){
      target.exportFile(ExportFormat.JPG, fileObj, false);
    }
  }
}
