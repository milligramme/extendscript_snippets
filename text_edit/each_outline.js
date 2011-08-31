var doc = app.documents[0];
outline_each_char(doc, false);

/**
 * outline each character
 * 
 *  個別にテキストグラフィック化
 * 
 *  使い方：
 *  テキストフレームまたは範囲選択して実行。
 *  テキストフレーム内の各文字、選択範囲の各文字を個別にグラフィック化。
 *  ちょっと位置をずらして複製します。
 *  グラフィック化後のオブジェクトのオーバープリントは勝手にオフにします。
 * 
 * @param {Object} doc Document
 * @param {Boolean} remove_org If true remove original text
 */
function outline_each_char (doc, remove_org) {
  // selection check
  if (doc.selection.length !== 1) {return};
    var sel_obj = doc.selection[0];
  if (sel_obj.constructor.name === "InsertionPoint") {return};
  if (sel_obj.hasOwnProperty('baseline') || sel_obj.constructor.name === "TextFrame") {
    var char_obj  = sel_obj.characters;
    var outline_arr = [];
    for (var i=0, iL=char_obj.length; i < iL ; i++) {
      var outlined_obj;
      // スペースなどの無形の字はエラーになるのではじく。
      try{
        outlined_obj = char_obj[i].createOutlines ( remove_org );
      } catch(e){}
      if (outlined_obj !== undefined) {
        outline_arr.push( outlined_obj[0] );
      }
    }
    for (var j=0, jL=outline_arr.length; j < jL ; j++) {
      outline_arr[j].move(undefined,[2, 2]); // ずらしたくなければコメントアウト
      //元の塗り色線色をバックアップ
      var current_fill_color   = outline_arr[j].fillColor;
      var current_stroke_color = outline_arr[j].strokeColor;
      //オーバープリントオフにする処理、簡易版
      outline_arr[j].fillColor   = "Paper";
      outline_arr[j].fillColor   = current_fill_color;
      outline_arr[j].strokeColor = "Paper";
      outline_arr[j].strokeColor = current_stroke_color;
    }
    //グループ化しておく
    doc.pages[0].groups.add(outline_arr);
  };

}