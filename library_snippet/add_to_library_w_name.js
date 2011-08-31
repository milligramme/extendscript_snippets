/*
ライブラリーに名前を付けてオブジェクトを追加
*/
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
if (app.selection.length > 0){
  //ライブラリーにフレーム枠の付かないように一時的にオフにする
  var tmp_frame_view = app.activeDocument.viewPreferences.showFrameEdges;
  app.activeDocument.viewPreferences.showFrameEdges = false;

  //ライブラリーがなければ、新規作成、キャンセルすれば終了
  var lib_obj;
  if(app.libraries.length == 0){
    var indl_path = Folder.selectDialog("ライブラリの保存場所をきめてください");
    if (indl_path === null) {
      app.activeDocument.viewPreferences.showFrameEdges = tmp_frame_view;
      exit();
    }
    var indl_name = new File(indl_path + "/" + new Date().getTime() + ".indl");
    lib_obj = app.libraries.add(indl_name);
  }
  lib_obj = app.libraries[0];
  var sel_obj = app.selection;
  main(lib_obj, sel_obj);
  //フレーム枠の表示を元に戻す
  app.activeDocument.viewPreferences.showFrameEdges = tmp_frame_view;
}

function main (lib, sel) {
  var source_text;//ライブラリーの詳細テキスト
  for(var i = 0; i < sel.length; i++){
    var sel_construtor_name = sel[i].constructor.name;
    switch(sel[i].constructor.name){
      case "Group":
        lib.store (sel[i],{name:sel_construtor_name} );
        break;
      case "TextFrame":
        if(sel[i].texts.length > 0){
          if(sel[i].texts[0].contents.length == 0){
            lib.store (sel[i], {name: "Empty " + sel_construtor_name});
          }
          else{
            source_text = sel[i].texts[0].contents;
            try{
              source_text = sel[i].tables[0].cells[0].contents;
            }catch(e){}
            //内容のあたま16文字で名付ける
            lib.store (sel[i], { name:source_text.substring(0, 16), description: source_text });
          }
        }
        break;
      case "Rectangle":
      case "GraphicLine":
      case "Oval":
      case "Polygon":
        if(sel[i].graphics.length != 0){
          lib.store (sel[i], {name:sel[i].graphics[0].itemLink.name,  description: sel[i].graphics[0].itemLink.filePath});
        }
        else{
          lib.store (sel[i], {name:sel_construtor_name});
        }
        break;
      default: break;
    }
  }
}


