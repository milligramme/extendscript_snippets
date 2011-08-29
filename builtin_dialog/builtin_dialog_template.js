/**
 * InDesign Builtin Dialog Sample 
 */
var dialog_obj = app.dialogs.add({name:"Builtin Dialog Test", canCancel: true});

with (dialog_obj){
  with (dialogColumns.add()){
    // ########### テキスト入力フィールド
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "テキスト入力フィールド"});
      }
      with (dialogColumns.add()){
        var text_edit_box = textEditboxes.add({
          editContents: "こんにちは",
          minWidth: 140 // フィールドの最小幅
          });
      }
    }
    // ########### 実数・整数値入力フィールド（↑↓で増減する）
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "実数・整数値入力フィールド"});
      }
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "実数："});
        var real_edit_box = realEditboxes.add({
          editValue: 0.1, // 増減値の初期値
          largeNudge: 0.5, // シフト押しながらの↑↓カーソルキーでの増減
          smallNudge: 0.1, // ↑↓カーソルキーでの増減
          minimumValue: -100, // 最小値
          maximumValue: 100 // 最大値
        });
      }
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "整数："});
        var integer_edit_box = integerEditboxes.add({
          editValue: 0,
          largeNudge: 10,
          smallNudge: 1,
          minimumValue: -100,
          maximumValue: 100
        });
      }
    }
    // ########### 単位付き入力フィールド　現在の単位系に換算される
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "単位付き入力フィールド"});
      }
      with (dialogColumns.add()){
        var unit_edit_text = measurementEditboxes.add({
          editValue: 1,
          editUnits: MeasurementUnits.Q // 換算する単位系
          });
      }
    }
    // ########### ドロップダウンリスト
    with (borderPanels.add()){//dropdown
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "ドロップダウンリスト"});
      }
      with (dialogColumns.add){
        var dropdown_list = dropdowns.add({
          stringList: ["松茸","竹輪","梅干"],// 文字列の配列
          selectedIndex: 0, // 選択するindex
          minWidth: 120
          });
      }
    }
    // ########### ラジオボタン
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "ラジオボタン"});
      }
      with (dialogColumns.add()){
        var myRadioButtonGroup = radiobuttonGroups.add({});
        with (myRadioButtonGroup){
          var top_rb = radiobuttonControls.add({
            staticLabel: "上",
            checkedState:true, // radiobuttonGroups.selectedButtonと同じ
            minWidth: 60
            });
          var center_rb = radiobuttonControls.add({staticLabel: "真ん中"});
          var bottom_rb = radiobuttonControls.add({staticLabel: "下"});
          selectedButton = 2;// radiobuttonControls.chechedStateと同じ
          minWidth = 200
        }
      }
    }
    // ########### チェックボックス
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "チェックボックス"});
      }
      with (dialogColumns.add()){
        var check_enabling_group = enablingGroups.add({
          staticLabel:"まとめて", 
          checkedState: false,
          });
        with (check_enabling_group){
          with (dialogColumns.add()){
            var checkbox_1 = checkboxControls.add({
              staticLabel:"1", 
              checkedState:true,
              minWidth: 90
              });
            var checkbox_2 = checkboxControls.add({staticLabel:"2", checkedState:false});
            var checkbox_3 = checkboxControls.add({staticLabel:"3", checkedState:true});
          }
        }
        with (dialogColumns.add()){
          var checkbox_4 = checkboxControls.add({staticLabel:"4", checkedState:true});
          var checkbox_5 = checkboxControls.add({staticLabel:"5", checkedState:false});
          var checkbox_6 = checkboxControls.add({staticLabel:"6", checkedState:false});
        }
      }
    }
    // ########### 単位付き入力用コンボボックス
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "単位付き入力用コンボボックス"});
      }
      with (dialogColumns.add){
        var unit_combobox = measurementComboboxes.add({
          stringList: ["1","2","3"],
          editValue: 1,
          editUnits: MeasurementUnits.MILLIMETERS,
          largeNudge: 1,
          smallNudge: 0.1,
          minimumValue: 0,
          maximumValue: 100
          });
      }
    }
    // ########### ％値入力用コンボボックス
    with (borderPanels.add()){
      with (dialogColumns.add()){
        staticTexts.add({staticLabel: "％値入力用コンボボックス"});
      }
      with (dialogColumns.add){
        var percent_combobox = percentComboboxes.add({
          stringList: ["25","50","75","100"],
          editValue: 75
          });
      }
    }
  }
}

if (dialog_obj.show() === true){

  // set vars before destroy dlg

  dialog_obj.destroy();
  // do something
}
else {
  dialog_obj.destroy();
}
