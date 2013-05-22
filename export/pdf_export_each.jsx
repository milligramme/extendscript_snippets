/*
ここからここまでバラPDF書き出し
"export PDFs with my range"
使い方：
PDF名にしたい内容が書いてあるテキストフレームにスクリプトラベルをいれておきます。
次のスクリプトラベルが発生するまでの範囲でPDF書き出していきます。
PDF書出しプリセット「Sample」を使用しますので適当に変更してください。
milligramme
www.milligramme.cc
*/

var export_each_pdf_with_range = function (doc) {
  var doc = doc;
  var page = doc.pages;
  
  var pdf_preset = app.pdfExportPresets.item(PDF_PRESET);
  if (!check_named_item(pdf_preset)) {
    alert("PDFプリセット \'" + PDF_PRESET + "\' がありません");
    return
  }
  
  var start_pages = [];
  var pdf_names   = [];
  
  // スクリプトラベルから情報をぬく
  for (var pi=0, piL=page.length; pi < piL ; pi++) {
    var tf = page[pi].textFrames;
    for (var ti=0, tiL=tf.length; ti < tiL ; ti++) {
      // itemByName(LABEL)は使えなくなった
      if (tf[ti].label === LABEL) {
        // ラベルの文字列無い場合ページ名にする
        var cont = tf[ti].contents == "" ? "page"+page[pi].name : tf[ti].contents;
        pdf_names.push(cont.replace(/\:/g,"_")+".pdf");
        start_pages.push(pi + 1);
      }
      else {
        continue;
      }
    };
  };
  // スクリプトラベルがない場合は1をいれる
  if (start_pages.length == 0) {
    start_pages.push(1);
  }
  
  var page_range = get_page_range(start_pages, page.length);
  export_pdf(doc, page_range, pdf_names, pdf_preset);
}

var export_pdf = function (doc, page_range /*Array*/, pdf_names /*Array*/, pdf_preset) {
	var dest = Folder.selectDialog("書き出すフォルダを選択");
  if (dest !== null) {
    for (var pri=0, priL=page_range.length; pri < priL ; pri++) {
      app.pdfExportPreferences.pageRange = page_range[pri];
      var pdf_file = new File(dest + "/" + pdf_names[pri]);
      doc.exportFile(ExportFormat.pdfType, pdf_file, false, pdf_preset);
    };
  }
  else {
    alert("書き出し先を指定してません");
  }
}

var get_page_range = function (ary, lastpage) {
  var ret = [];
  // ページ範囲に + をつけて絶対ページで指定
  for (var i=0, iL=ary.length-1; i < iL ; i++) {
    ret.push("+" + ary[i] + "-+"+(ary[i+1]-1))
  };
  ret.push("+" + ary[ary.length-1] + "-+" + lastpage);
  return ret;
}

var check_named_item = function (obj) {
  var ret = true
  try {
    obj.name;
  }
  catch(e){
    return false
  }
  return ret
}


// run
if (new File($.fileName).name==$.stack.replace(/[\[\]\n]/g,"")) {
  var PDF_PRESET = "Sample";
  var LABEL      = "Kokokara";

  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
  if (app.documents.length === 0) {
    alert("ドキュメントをひらいてください");
    exit();
  }
  else {
    export_each_pdf_with_range(app.documents[0]);
    alert("終了");
  }
}

