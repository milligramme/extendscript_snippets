#target "Illustrator"

/**
 * save as eps
 * 
 * @param {Object} doc_obj Document
 * @param {Number} eps_prev_mode EPS preview mode
 *        1 : None => 
 *        2 : BWMACINTOSH => Mac 1Bit
 *        3 : COLORMACINTOSH => Mac 8Bit
 *        4 : BWTIFF => TIFF 1Bit
 *        5 : TRANSPARENTCOLORTIFF => TIFFカラー（透明）
 *        6 : COLORTIFF => TIFFカラー（不透明）
 * @example
 * save_ai2eps (app.activeDocument, 1);
 */
function save_ai2eps (doc_obj, eps_prev_mode) {
  // var doc_obj      = app.activeDocument;
  var doc_ver      = app.version.split('.')[0]
  var rm_extension = doc_obj.name.toString().replace(/\..{2,4}$/,"");//拡張子をとる
  var old_name     = rm_extension.replace(/ \[更新済み\]?/,"");// [更新済み]があるならとる
  var new_path     = doc_obj.path.toString()+"/"+rm_extension+".eps";
  var save_path    = new File(new_path);

  var save_opt     = new EPSSaveOptions();
  //保存オプション
  save_opt.compatibility = Compatibility['ILLUSTRATOR' + doc_ver];
  switch(eps_prev_mode){
    case 1: 
      save_opt.preview = EPSPreview.None;//None
      break;
    case 2: 
      save_opt.preview = EPSPreview.BWMACINTOSH;//Mac 1Bit
      break;
    case 3: 
      save_opt.preview = EPSPreview.COLORMACINTOSH;//Mac 8Bit
      break;
    case 4: 
      save_opt.preview = EPSPreview.BWTIFF;//TIFF 1Bit
      break;
    case 5: 
      save_opt.preview = EPSPreview.TRANSPARENTCOLORTIFF;//TIFFカラー（透明）
      break;
    case 6: 
      save_opt.preview = EPSPreview.COLORTIFF;//TIFFカラー（不透明）
      break;
    default: ; break;
  }
  save_opt.overPrint                  = PDFOverprint.PRESERVEPDFOVERPRINT;//オーバープリント保持
  save_opt.embedAllFonts              = true;
  save_opt.embedLinkedFiles           = true;//配置画像を含む
  save_opt.includeDocumentThumbnails  = true;
  save_opt.cmykPostScript             = true;
  save_opt.compatibleGradientPrinting = false;
  // save_opt.flattenOutput              = OutputFlattening.PRESERVEAPPEARANCE//
  save_opt.EPSPostScriptLevelEnum     = EPSPostScriptLevelEnum.LEVEL3//ポストスクリプトレベル3

  //別名保存、元データは保存せずに閉じる
  doc_obj.saveAs(save_path, save_opt);
  doc_obj.close(SaveOptions.DONOTSAVECHANGES);
}
