/**
 *  cells size setter (with cals) 
 * 
 */
if(app.documents.length == 0 || app.selection.length == 0){exit();}

var cellColumn, cellRow;
selObj = app.selection[0];
switch(selObj.constructor.name){
  case "Table":
    cellColumn = selObj.columnCount;
    cellRow = selObj.bodyRowCount + selObj.headerRowCount + selObj.footerRowCount;
    break;
  case "Cell":
    cellColumn = selObj.columnSpan;
    cellRow = selObj.rowSpan;
    break;
  default :// TableとCell以外は無視
    alert("choose table or cells");
    exit();
}

set_cells_size (selObj, cellColumn, cellRow);

function set_cells_size (selObj, cellColumn, cellRow) {
  //結合セルも個別セルとして幅と高さを取得
  var eachCellW = selObj.columns.everyItem().width;
  var eachCellH = selObj.rows.everyItem().height;

  //edittextの大きさ,パネルのマージンなどを設定
  var editbox = {'w': 60, 'h': 20}; //edittextの大きさ
  var startPt; //edittext作成の開始点
  var pnlMargin = [10,10,10,15]; //パネルのマージン
  var gutter = 5; //edittextの間隔
  var wArr = [];
  var hArr = [];

  var dlg = new Window('dialog',"cells size setter",undefined);
  dlg.pnl = dlg.add('panel',undefined);//サイズは仮

  //幅用のedittext
  startPt = [pnlMargin[0], pnlMargin[1]];
  startPt[0] += editbox['w'] + gutter;//開始点を右にずらす

  for (var ic=0; ic < cellColumn; ic++) {
    var wValue = dlg.pnl.add('edittext',[startPt[0], startPt[1], startPt[0]+editbox['w'], startPt[1]+editbox['h']],eachCellW[ic]);
    startPt[0] = startPt[0] + editbox['w'] + gutter;
    wArr.push(wValue);
  }
  var pnlW = startPt[0]+pnlMargin[2];//dlg.pnl width

  //高さ用のedittext
  startPt = [pnlMargin[0], pnlMargin[1]];
  startPt[1] += editbox['h'] + gutter;//開始点を下にずらす

  for (var ir=0; ir < cellRow; ir++) {
    var hValue = dlg.pnl.add('edittext',[startPt[0], startPt[1], startPt[0]+editbox['w'], startPt[1]+editbox['h']],eachCellH[ir]);
    startPt[1] = startPt[1] + editbox['h'] + gutter;
    hArr.push(hValue);
  }
  var pnlH = startPt[1]+pnlMargin[3];//dlg.pnl height

  dlg.pnl.bounds = [0, 0, pnlW, pnlH];//パネルのサイズを設定

  dlg.grp = dlg.add('group')
  dlg.okButton = dlg.grp.add('button',undefined,'ok',{name: 'ok'});
  dlg.cancelButton = dlg.grp.add('button',undefined,'cancel',{name: 'cancel'});

  dlg.okButton.onClick = function(){
    dlg.close();
    flg = true;
  }
  dlg.cancelButton.onClick = function(){
    dlg.close();
    flg = false;
  }
  dlg.center();
  dlg.show();

  if(flg == true){
    for (var iw=0; iw < wArr.length; iw++) {
      if (eval(wArr[iw].text)*1 > 0) {
        selObj.columns[iw].width = eval(wArr[iw].text) * 1;
      }
  	}
    for (var ih=0; ih < hArr.length; ih++) {
      if (eval(hArr[ih].text)*1 > 0) {
        selObj.rows[ih].autoGrow = false;
        selObj.rows[ih].height = eval(hArr[ih].text) * 1;
      }
    }
  }
}