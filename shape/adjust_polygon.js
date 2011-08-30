/**
星型をととのえる

使い方：
多角形オブジェクトを選んで実行。
ダイアログが出るので、頂点の数と星型の比率を入力して続行。
*/

if(app.documents.length > 0 && app.selection.length === 1){
  var selObj = app.selection[0];
  switch (selObj.constructor.name){
    case "Polygon":
    case "Rectangle":
    case "TextFrame":
      main();
      break;
    default : break;
  }
}
else {
  alert("select one object");
}

function main(){
  var currentPP = selObj.paths[0].pathPoints.length;
  var selGBon   = selObj.geometricBounds;
  var selC      = [selGBon[1]+(selGBon[3]-selGBon[1])/2, selGBon[0]+(selGBon[2]-selGBon[0])/2];

  //ピタゴラスの定理からだいたいの比率をもとめる
  var starA, starB, rA, rB;
  starA = selObj.paths[0].pathPoints[0].anchor;
  starB = selObj.paths[0].pathPoints[1].anchor;
  rA = Math.sqrt (Math.pow(selC[0]-starA[0], 2)+Math.pow(selC[1]-starA[1], 2));
  rB = Math.sqrt(Math.pow(selC[0]-starB[0], 2)+Math.pow(selC[1]-starB[1], 2));

  var insPer;
  if(rA > rB){
    insPer = 100-rB/rA*100;
  }
  else{
    insPer = 100-rA/rB*100;
  }

  var current_pp = Math.floor(Math.max(3, currentPP/2));
  var inset_per = Math.floor(insPer);
  var result = dlg (current_pp, inset_per);
  if (result !== undefined) {
    selObj.convertShape (ConvertShapeOptions.CONVERT_TO_POLYGON, result[0], result[1]);//(convertShapeOption, numberOfSides, insetPercentage, cornerRadius)
  };
}

function dlg (current_pp, inset_per) {
  var u;
  var w = new Window('dialog', "Adjust Polygon", u);
  w.orientation = 'column';
  // w.margins = 5;
  // w.spacing = 10;
  w.alignChildren = ['fill', 'fill'];
  w.g1 = w.add('group');
  w.g1.add('statictext', u, "頂点の数: ");
  edt_num_of_side = w.g1.add('edittext', u, current_pp+"");
  w.g1.add('statictext', u, "(3-100)");
  
  w.g2 = w.add('group');
  w.g2.add('statictext', u, "星形の比: ");
  edt_inset_per = w.g2.add('edittext', u, inset_per+"");
  w.g2.add('statictext', u, "(0-100)");
  edt_num_of_side.characters = 4;
  edt_inset_per.characters = 4;

  w.btn_g = w.add('group');
  var ok_btn  = w.btn_g.add('button', u, "OK", {name: "ok"});
  var can_btn = w.btn_g.add('button', u, "Cancel", {name: "cancel"});

  ok_btn.minimumSize = can_btn.minimumSize = [66,23];
  ok_btn.size  = ok_btn.minimumSize;
  can_btn.size = can_btn.minimumSize;
  var value_arr;
  ok_btn.onClick = function () {
    value_arr = [
      Math.floor(edt_num_of_side.text * 1), 
      Math.floor(edt_inset_per.text * 1)
      ];
    if (value_arr[0] >= 3 && value_arr[0] <= 100 && value_arr[1] >= 0 && value_arr[1] <= 100) {
      w.close();
    }
    else {
      alert("out of range or invaid value");
    }
  }

  can_btn.onClick = function () {
    w.close();
  }

  w.show();
  return value_arr;
}