﻿//save old illustrator file to eps documentvar docObj=app.activeDocument;//別名保存名をvar removeExtName=docObj.name.toString().replace(/\..{2,4}$/,"");//拡張子をとるvar oldName=removeExtName.replace(/ \[更新済み\]?/,"");// [更新済み]があるならとるvar newPath=docObj.path.toString()+"/"+oldName+"+.eps";var savePath=new File(newPath);var saveOpt=new EPSSaveOptions();//ここから保存オプションsaveOpt.compatibility=Compatibility.ILLUSTRATOR13;//AI CS3//saveOpt.preview=EPSPreview.TRANSPARENTCOLORTIFF;//プレビューTIFFカラー（透明）//文字がちまちまいっぱいデータなんかはプレビューの限界に達すると思うのでそんなときはTIFF(不透明)にsaveOpt.preview=EPSPreview.COLORTIFF;//プレビューTIFFカラー（不透明）saveOpt.overPrint=PDFOverprint.PRESERVEPDFOVERPRINT;//オーバープリント保持saveOpt.embedAllFonts=true;//フォント埋め込むsaveOpt.embedLinkedFiles=true;//配置画像を含むsaveOpt.includeDocumentThumbnails=true;//サムネイル含めるsaveOpt.cmykPostScript=true;saveOpt.compatibleGradientPrinting=false;saveOpt.flattenOutput=OutputFlattening.PRESERVEAPPEARANCE//saveOpt.EPSPostScriptLevelEnum=EPSPostScriptLevelEnum.LEVEL3//ポストスクリプトレベル3//別名保存、元データは保存せずに閉じるdocObj.saveAs(savePath, saveOpt);docObj.close(SaveOptions.DONOTSAVECHANGES);alert("completed");