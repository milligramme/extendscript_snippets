// テキストフレームをグラフィックフレームに変換
// 第二引数 true で中身の文字が会った場合、消去の前に確認しない、false で確認メッセージ
var convert_to_graphicframe = function (sel, force_delete_text){
  for(var i=0; i < sel.length; i++){
    var target;
    switch(sel[i].constructor.name){
      case "InsertionPoint": 
        target = sel[i].parentTextFrames[0]; break;
      case "TextFrame":
      case "Rectangle": 
        target = sel[i]; break;
      case "Group": break;
        // グループは処理しない
        
      default : break;
      }
    if (target == undefined) {return};
    // target が undefinedの場合以下処理しない
    
    if(target.contentType == ContentType.TEXT_TYPE){
      try{
        target.contentType = ContentType.GRAPHIC_TYPE;
      }
      catch(e){
        if(force_delete_text == true){
            // textsだとオーバーフローした分が残ってエラーになる
          target.parentStory.contents = "";
          target.contentType = ContentType.GRAPHIC_TYPE;
        }
        else{
          var delete_text = confirm("\""+target.texts[0].contents+"\" 文字情報がありますが消してよいか？",true);
          if(delete_text == true){
            target.parentStory.contents = "";
            target.contentType = ContentType.GRAPHIC_TYPE;
          }
        }
      }
    }
  }
}

// run
convert_to_graphicframe(app.selection, false);