/*
* "collect placed image infomation"
* 
* 使い方：
* Illustrator書類を開いて実行、複数ファイル可。
* 開いている全てのIllustrator書類上の配置画像の変倍率とファイル名を別レイヤに表示、
* その後EPSで複製保存をして、オリジナルは保存せずに閉じます。
* 
* グループ化したもの、複数画像をまとめてクリッピングされているものは無視します。
* 
*/
#target "Illustrator"

var doc = app.documents;
var CR = String.fromCharCode(13);//改行
var SEPA = String.fromCharCode(47);//スラッシュ

for(var i=doc.length-1; i>=0;  i--){
  //情報ラベル枠色
  var framColor = new CMYKColor();
  framColor.cyan    = 0;
  framColor.magenta = 0;
  framColor.yellow  = 100;
  framColor.black   = 0;

  var p_val = 0;
  var info_arr = [];
  var position_arr = [];
  var lay = doc[i].layers;
  for(var ly=0; ly<lay.length; ly++){
    lay[ly].locked = false;
    var page_item = lay[ly].pageItems;

    for(var pgi=0; pgi<page_item.length; pgi++){
      page_item[pgi].locked = false;
      // $.writeln ("doc"+i+"_"+page_item[pgi].typename+"__"+(pgi+1)+"/"+page_item.length);
    
      var mA, mB, mC, mD, posX, posY, nm;
      if (page_item[pgi].typename === "PlacedItem" || (page_item[pgi].typename === "GroupItem" && page_item[pgi].placedItems.length >= 1)){
        if(page_item[pgi].typename === "PlacedItem"){
          mA = page_item[pgi].matrix.mValueA;
          mB = page_item[pgi].matrix.mValueB;
          mC = page_item[pgi].matrix.mValueC;
          mD = page_item[pgi].matrix.mValueD;
          posX = page_item[pgi].position[0];
          posY = page_item[pgi].position[1];
          nm = decodeURI(page_item[pgi].file);
          nm = nm.replace(nm,nm.substr (nm.lastIndexOf(SEPA)+1, nm.length-nm.lastIndexOf(SEPA)));
        }
        if (page_item[pgi].typename === "GroupItem" && page_item[pgi].placedItems.length >= 1){
          mA = page_item[pgi].placedItems[0].matrix.mValueA;
          mB = page_item[pgi].placedItems[0].matrix.mValueB;
          mC = page_item[pgi].placedItems[0].matrix.mValueC;
          mD = page_item[pgi].placedItems[0].matrix.mValueD;
          nm = decodeURI(page_item[pgi].placedItems[0].file);
          nm = nm.replace(nm,nm.substr (nm.lastIndexOf(SEPA)+1, nm.length-nm.lastIndexOf(SEPA)));
          if(page_item[pgi].clipped === true){//画像がクリップされているとき
            posX = page_item[pgi].pageItems[0].position[0];
            posY = page_item[pgi].pageItems[0].position[1];
          }
          else{
            posX = page_item[pgi].position[0];
            posY = page_item[pgi].position[1];
          }
        }
        var page_itemHs = Math.round((Math.sqrt((Math.pow(mA,2)) + (Math.pow(mB,2)))*100000))/1000;
        var page_itemVs = Math.round((Math.sqrt((Math.pow(mC,2)) + (Math.pow(mD,2)))*100000))/1000;

        info_arr.push(page_itemHs+"×"+page_itemVs+"%"+CR+nm); // 変倍率とファイル名を配列に追加
        position_arr.push([posX,posY]); // 情報ラベルのポジションを配列に追加
        p_val++;
      }
    } //for pgi
  } //for ly

  //情報ラベル
  if(doc[i].layers[0].name !== "infoLay"){
    var info_lay = doc[i].layers.add();
    info_lay.name = "infoLay";
  }
  for(var j=0; j<p_val; j++){
    var info_tf = info_lay.textFrames.add();
    info_tf.contents = info_arr[j];
    info_tf.textRange.size = 9;
    info_tf.textRange.characterAttributes.autoLeading = false;
    info_tf.textRange.characterAttributes.leading = 10;
    info_tf.position = position_arr[j];

    var tmp_frame = info_lay.pathItems.rectangle(info_tf.top, info_tf.left, info_tf.width, info_tf.height);
    tmp_frame.filled = true;
    tmp_frame.fillColor = framColor;
    info_tf.zOrder (ZOrderMethod.BRINGTOFRONT);

    // $.writeln ("doc"+i+"_placed"+j+"__"+(j+1)+"/"+p_val);
  }

  //別名保存名をとりあえずepsで
  var rm_extension = doc[i].name.toString().replace(/\..{2,4}$/,"");//拡張子をとる
  var olf_name = rm_extension.replace(/ \[更新済み\]?/,"");// [更新済み]があるならとる
  var new_path = doc[i].path.toString()+"/"+olf_name+"_.eps";//アンダーバー付きのepsに
  var save_path = new File(new_path);

  //ここからeps保存オプション
  var save_option = new EPSSaveOptions();
  save_option.compatibility              = Compatibility.ILLUSTRATOR13;//AI CS3
  save_option.preview                    = EPSPreview.COLORTIFF;//プレビューTIFFカラー
  save_option.overPrint                  = PDFOverprint.PRESERVEPDFOVERPRINT;//オーバープリント保持
  save_option.embedAllFonts              = true;
  save_option.embedLinkedFiles           = false;//配置画像を含まない
  save_option.includeDocumentThumbnails  = true;
  save_option.cmykPostScript             = true;
  save_option.compatibleGradientPrinting = false;
  //save_option.flattenOutput            = OutputFlattening.PRESERVEAPPEARANCE//プリンタの初期設定値を使用？
  save_option.EPSPostScriptLevelEnum     = EPSPostScriptLevelEnum.LEVEL3//ポストスクリプトレベル3

  //別名保存、元データは保存せずに閉じる
  doc[i].saveAs(save_path, save_option);
  doc[i].close(save_options.DONOTSAVECHANGES);

}//for doc
