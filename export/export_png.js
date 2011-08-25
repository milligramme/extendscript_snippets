/**
 * export PNG 
 * @param {Object} target Selected Object to export PNG
 * @param {Object} file Export File Destination
 * 
 * @returns {Boolean} true if success to export
 * 
 * export 72ppi transparent png no options exist
 * 
 * @example var sel = app.selection[0];
 * var file = new File("~/Desktop/pudding.png");
 * var feedback = exportPNG(sel, file);
 * alert(feedback);//boolean
 */
function export_png (target, file) {
  if(target.allGraphics.length === 1){
    var graphic_obj = target.allGraphics[0];
    switch(graphic_obj.constructor.name){
      case "PICT" :
      case "EPS" :
      case "WMF" :
      case "PDF" :
      case "Image" ://PSD/TIFF/JPEG/BMP
      case "ImportedPage" ://INDD
        try{
          target.exportFile(ExportFormat.PNG_FORMAT, file );
          return true;
        }catch(e){
          return false;
          }
      break;
      default : return false;
      }
    }
  else{
    switch(target.constructor.name){
      case "Polygon" :
      case "Rectangle" :
      case "Oval" :
      case "Group" :
      case "GraphicLine" :
      case "TextFrame" :
        try{
          target.exportFile( ExportFormat.PNG_FORMAT, file );
          return true;
        }
        catch(e){
          return false;
        }
        break;
      default : return false;
    }
  }
}
