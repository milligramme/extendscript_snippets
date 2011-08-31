/**
ドキュメントとアプリケーションの単位と増減値をととのえる
"set unit and increment of documents and application"

使い方：
ドキュメントまたはアプリ全体の「単位と増減値」の設定をドロップダウンリストから変更します。

単位は4種類
  座標がmm、組版が級歯
  座標も組版もポイント
  座標がmm、組版が級歯
  座標がパイカ、組版がポイント

これらに合わせて増減値もそれぞれ、mm、ptでキリが良い数値に変更します。

ドキュメントが開いている場合
"apply to most front doc"チェックボックスにチェックされていると
最前面のドキュメントのみに適用します。外すと開いている全てのドキュメントに適用します。

ドキュメントが開いていない場合
"apply to most front doc"チェックボックスのかわりに、
メッセージが"apply to application global"となりアプリケーション全体の設定を変更します。

*/
set_unit();
function set_unit () {
  var target_obj = app.documents.length === 0 ? [].push(app) : app.documents;

  //単位いろいろ
  var uMM = MeasurementUnits.MILLIMETERS;
  var uPt = MeasurementUnits.POINTS;
  var uPC = MeasurementUnits.PICAS;//（1パイカ=12ポイント）
  var uH  = MeasurementUnits.HA;//歯
  var uQ  = MeasurementUnits.Q;

  //ダイアログ

  var u;
  var dlg = new Window('dialog', 'unitswitch', u);
  dlg.orientation = 'column';
  dlg.margins = 10;
  dlg.spacing = 5;
  dlg.alignChildren = ['fill', 'fill'];
  dlg.center();
  dlg.dropdownList = dlg.add('dropdownlist',[0,0,180,20],
    ['space: mm / text: QH', 
    'space: pt / text: pt',
    'space: mm / text: pt',
    'space: pc / text: pt']
    );
  dlg.dropdownList.selection = 0;
  if (app.documents.length !== 0){
    dlg.applyDocBtn = dlg.add('checkbox', u, 'apply to most front doc.');
    dlg.applyDocBtn.value = true;
  }
  else{
    dlg.add('statictext', u, 'apply to application global.');
  }
  // dlg.okBtn = dlg.add('button', u, 'ok', {name:'ok'});
  dlg.btn_g = dlg.add('group');
  var ok_btn  = dlg.btn_g.add('button', u, "OK", {name: "ok"});
  var can_btn = dlg.btn_g.add('button', u, "Cancel", {name: "cancel"});

  ok_btn.minimumSize = can_btn.minimumSize = [66,23];
  ok_btn.size  = ok_btn.minimumSize;
  can_btn.size = can_btn.minimumSize;

  flg = false
  ok_btn.onClick = function () {
    flg = true
    dlg.close();
  }

  can_btn.onClick = function () {
    dlg.close();
  }

  dlg.show();
  if (flg) {
    var unitSet = dlg.dropdownList.selection.index;
    try{
      var applyDoc = dlg.applyDocBtn.value;
    }catch(e){
      var applyDoc = true;
    }

    var docLength = applyDoc === true ? 1 : target_obj.length;
    for (var i=0, iL=docLength; i < iL; i++){
      //座標がmm、組版が級歯
      if (unitSet === 0){
        with (target_obj[i].viewPreferences){
          horizontalMeasurementUnits  = uMM;
          verticalMeasurementUnits    = uMM;
          typographicMeasurementUnits = uH;
          textSizeMeasurementUnits    = uQ;
          lineMeasurementUnits        = uMM;
          pointsPerInch               = 72;
          cursorKeyIncrement          = "0.1mm";
        }
        with (target_obj[i].textPreferences){
          leadingKeyIncrement       = "0.5H";
          baselineShiftKeyIncrement = "0.5H";
          kerningKeyIncrement       = 20;
          }
        }//mm qh

      //座標も組版もポイント
      else if (unitSet === 1){
        with (target_obj[i].viewPreferences){
          horizontalMeasurementUnits  = uPt;
          verticalMeasurementUnits    = uPt;
          typographicMeasurementUnits = uPt;
          textSizeMeasurementUnits    = uPt;
          lineMeasurementUnits        = uPt;
          pointsPerInch               = 72;
          cursorKeyIncrement          = "0.5pt";
        }
        with (target_obj[i].textPreferences){
          leadingKeyIncrement       = "0.5pt";
          baselineShiftKeyIncrement = "0.5pt";
          kerningKeyIncrement       = 20;
        }
      }//pt pt

      //座標がmm、組版がポイント
      else if (unitSet === 2){
        with (target_obj[i].viewPreferences){
          horizontalMeasurementUnits  = uMM;
          verticalMeasurementUnits    = uMM;
          typographicMeasurementUnits = uPt;
          textSizeMeasurementUnits    = uPt;
          lineMeasurementUnits        = uPt;
          pointsPerInch               = 72;
          cursorKeyIncrement          = "0.1mm";
        }
        with (target_obj[i].textPreferences){
          leadingKeyIncrement       = "0.5pt";
          baselineShiftKeyIncrement = "0.5pt";
          kerningKeyIncrement       = 20;
        }
      }//mm pt

      //座標がパイカ、組版がポイント
      else if (unitSet === 3){
        with (target_obj[i].viewPreferences){
          horizontalMeasurementUnits  = uPC;
          verticalMeasurementUnits    = uPC;
          typographicMeasurementUnits = uPt;
          textSizeMeasurementUnits    = uPt;
          lineMeasurementUnits        = uPt;
          pointsPerInch               = 72;
          cursorKeyIncrement          = "0.5pt";
        }
        with (target_obj[i].textPreferences){
          leadingKeyIncrement       = "0.5pt";
          baselineShiftKeyIncrement = "0.5pt";
          kerningKeyIncrement       = 20;
        }
      }//pc pt
    }
  };
}
