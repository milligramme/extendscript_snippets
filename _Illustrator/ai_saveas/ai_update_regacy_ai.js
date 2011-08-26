/*
* Update regacy ai
* 
* 古いバージョンのIllustratorを「フォントを更新せず」に開いて実行。
* Morisawa OTF, CIDを同名のOpenType Fontに置換してCS3epsに再保存。
* ファイル名は"○○○○_.eps"で、元ファイルは保持。
* 保存オプションがCS3になってる
*/
#target "Illustrator"

app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;

// var start  = new Date().getTime();
for (var d=app.documents.length; d > 0; d--){
  var doc = app.activeDocument;
  //フォントを更新する
  doc.legacyTextItems.convertToNative();
  
  //レイヤーのロック解除
  var lay_obj = doc.layers;
  for (var k=0; k<lay_obj.length; k++){
    lay_obj[k].locked = false;
  }

  //テキストフレーム
  var tf_obj = doc.textFrames;
  for (var i=0; i < tf_obj.length; i++){
    tf_obj[i].locked = false;
    var target_text = tf_obj[i].textRange.characters;
    for (var j=0; j<target_text.length; j++){
      var org_font = target_text[j].characterAttributes.textFont;
  
      //モリサワOCF/CIDをOTF Proに置換、PS名で追加削除する。
      switch(org_font.name){
        case "Ryumin-Light" : rep_font = app.textFonts.getByName ("RyuminPro-Light"); break;
        case "Ryumin-regular" : rep_font = app.textFonts.getByName ("RyuminPro-Regular"); break;
        case "Ryumin-Medium" : rep_font = app.textFonts.getByName ("RyuminPro-Medium"); break;
        case "Ryumin-Bold" : rep_font = app.textFonts.getByName ("RyuminPro-Bold"); break;
        case "Ryumin-heavy" : rep_font = app.textFonts.getByName ("RyuminPro-Heavy"); break;
        case "Ryumin-Ultra" : rep_font = app.textFonts.getByName ("RyuminPro-Ultra"); break;
        case "GothicBBB-Medium" : rep_font = app.textFonts.getByName ("GothicBBBPro-Medium"); break;
        case "FutoMinA101-Bold" : rep_font = app.textFonts.getByName ("FutoMinA101Pro-Bold"); break;
        case "FutoGoB101-Bold" : rep_font = app.textFonts.getByName ("FutoGoB101Pro-Bold"); break;
        case "MidashiMin-MA31" : rep_font = app.textFonts.getByName ("MidashiMinPro-MA31"); break;
        case "MidashiGo-MB31" : rep_font = app.textFonts.getByName ("MidashiGoPro-MB31"); break;
        case "ShinGo-Light" : rep_font = app.textFonts.getByName ("ShinGoPro-Light"); break;
        case "ShinGo-regular" : rep_font = app.textFonts.getByName ("ShinGoPro-Regular"); break;
        case "ShinGo-Medium" : rep_font = app.textFonts.getByName ("ShinGoPro-Medium"); break;
        case "ShinGo-Bold" : rep_font = app.textFonts.getByName ("ShinGoPro-Bold"); break;
        case "ShinGo-Ultra" : rep_font = app.textFonts.getByName ("ShinGoPro-Ultra"); break;
        case "GothicMB101-Bold" : rep_font = app.textFonts.getByName ("GothicMB101Pro-Bold"); break;
        case "GothicMB101-hea" : rep_font = app.textFonts.getByName ("GothicMB101Pro-Heavy"); break;
        case "GothicMB101-Ult" : rep_font = app.textFonts.getByName ("GothicMB101Pro-Ultra"); break;
        case "Jun101-Light" : rep_font = app.textFonts.getByName ("Jun101Pro-Light"); break;
        //case "Jun201-regular" : rep_font = app.textFonts.getByName ("Jun201Pro-regular"); break;
        case "Jun34-Medium" : rep_font = app.textFonts.getByName ("Jun34Pro-Medium"); break;
        case "Jun501-Bold" : rep_font = app.textFonts.getByName ("Jun501Pro-Bold"); break;
        case "ShinseiKai-CBSK1" : rep_font = app.textFonts.getByName ("ShinseiKaiPro-CBSK1"); break;
        default :rep_font = app.textFonts.getByName (org_font.name);break;//ないものはそのまま
      }//for switch
      //rep_fontで置換
      target_text[j].characterAttributes.textFont = rep_font;
      //カーニングを自動に
      target_text[j].kerningMethod = AutoKernType.AUTO;
      //トラッキングをゼロに
      target_text[j].tracking = 0;
    }//for j
  }//for i

  //別名保存名を
  var rm_extension = doc.name.toString().replace(/\..{2,4}$/,"");//拡張子をとる
  var old_name     = rm_extension.replace(/ \[更新済み\]?/,"");// [更新済み]があるならとる
  var new_path     = doc.path.toString()+"/"+old_name+"_.eps";//アンダーバー付きに
  var save_path    = new File(new_path);
  var save_opt     = new EPSSaveOptions();

  //保存オプション
  save_opt.compatibility = Compatibility.ILLUSTRATOR13;//AI CS3
  //save_opt.preview                  = EPSPreview.TRANSPARENTCOLORTIFF;//プレビューTIFFカラー（透明）
  //プレビューTIFFカラー（透明）だと、文字がちまちまいっぱいデータなんかはプレビューの限界に達する
  save_opt.preview                    = EPSPreview.COLORTIFF;//プレビューTIFFカラー（不透明）
  save_opt.overPrint                  = PDFOverprint.PRESERVEPDFOVERPRINT;//オーバープリント保持
  save_opt.embedAllFonts              = true;//フォント埋め込む
  save_opt.embedLinkedFiles           = true;//配置画像を含む
  save_opt.includeDocumentThumbnails  = true;//サムネイル含める
  save_opt.cmykPostScript             = true;
  save_opt.compatibleGradientPrinting = false;
  //save_opt.flattenOutput            = OutputFlattening.PRESERVEAPPEARANCE//効かない
  save_opt.EPSPostScriptLevelEnum     = EPSPostScriptLevelEnum.LEVEL3//ポストスクリプトレベル3

  //別名保存、元データは保存せずに閉じる
  doc.saveAs(save_path, save_opt);
  doc.close(SaveOptions.DONOTSAVECHANGES);
}//for document
alert("update complete");

// var end=new Date().getTime();
// var lap=end-start;
// $.writeln(lap/1000+"sec");
