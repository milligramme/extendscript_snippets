//指定ページで新規ウィンドウ
var goto_page_in_new_window = function() {
  if (app.documents.length === 0) {return};
  var doc = app.documents[0];
  var dlg = app.dialogs.add({name:"go to page"});
  with(dlg){
    with (dialogColumns.add()){
      var page_no = textEditboxes.add({
        //デフォルト表示は現在のアクティブページ
        editContents: app.windows[0].activePage.appliedSection.name+app.windows[0].activePage.name, 
        minWidht:30
        })
      }
    }
  if(dlg.show() == true){
    var goto_page = page_no.editContents;
    var calc_page = eval(goto_page).toString();
    dlg.destroy();
    //新規ウインドウ
    var new_win = doc.windows.add();
    try{
      //ページに行ってみる
      new_win.activePage = doc.pages.item(goto_page);
    }
    catch(e){
      //ページがなかったら
      try{
        //計算してみる
        new_win.activePage = doc.pages.item(calc_page);
        }
      catch(e){
        new_win.close();
        alert("The page does not exist.");
      }
    }
  }
  else{
    dlg.destroy();
  }
};

// run
goto_page_in_new_window();