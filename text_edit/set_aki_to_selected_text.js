/*
選択テキストの両脇のアキをいじる

使い方：
選択テキストの両脇にそれぞれ文字前後のアキ量を設定します。
アキ量をリセットにチェックすると、「自動」になります。

動作確認：OS10.4.11 InDesign CS3
*/
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

if(app.selection.length > 0){
  akiDialog();
}//if selection

//ダイアログ
function akiDialog(){
  var dialogObj = app.dialogs.add({name:"両脇のアキ量を設定す",canCancel:true});
  with(dialogObj){
    with(dialogColumns.add()){
      //アキ量を設定
      with(borderPanels.add()){
        with(dialogColumns.add()){
          staticTexts.add({staticLabel:"文字前のアキ量"});
        }
        with(dialogColumns.add()){
          var akiBefore = dropdowns.add({stringList: ["ベタ","八分","四分","三分","二分","二分四分","全角"],selectedIndex: 2});
        }
        with(dialogColumns.add()){
          staticTexts.add({staticLabel:"文字後のアキ量"});
        }
        with(dialogColumns.add()){
          var akiAfter = dropdowns.add({stringList: ["ベタ","八分","四分","三分","二分","二分四分","全角"],selectedIndex: 2});
        }
      }
      //アキ量をリセット
      with(borderPanels.add()){//check box
        with(dialogColumns.add()){
          staticTexts.add({staticLabel: "アキ量をリセット"});
        }
        with(dialogColumns.add()){
          var akiReset = checkboxControls.add({checkedState:false});
        }
      }//check box
    }//dialog column
  }//dialog

  //dialog の結果を変数に反映
  if(dialogObj.show() == true){
    var akiB, akiA, akiR;
    switch(akiBefore.selectedIndex){
      case 0: akiB = 0;break;
      case 1: akiB = 0.125;break;
      case 2: akiB = 0.25;break;
      case 3: akiB = 0.33333333333333;break;
      case 4: akiB = 0.5;break;
      case 5: akiB = 0.75;break;
      case 6: akiB = 1;break;
    }
    switch(akiAfter.selectedIndex){
      case 0: akiA = 0;break;
      case 1: akiA = 0.125;break;
      case 2: akiA = 0.25;break;
      case 3: akiA = 0.33333333333333;break;
      case 4: akiA = 0.5;break;
      case 5: akiA = 0.75;break;
      case 6: akiA = 1;break;
    }
    akiR = akiReset.checkedState;//trueかfalseか
    akiEnhance(akiB,akiA,akiR);//アキ量を設定
    dialogObj.destroy();
  }
  else{
    dialogObj.destroy();
  }
}

function akiEnhance(akiB, akiA, akiR){
  var selObj = app.selection[0];
  var selWho = selObj.constructor.name;

  var spBf     = akiB;
  var spAf     = akiA;
  var resetAki = akiR;

  if(selObj.lines.length < 2){//Lineが2行みまんなら
    switch(selWho){
      case "InsertionPoint":
        alert("挿入点なのでなにもしない"); break;
      case "Character":
      case "Word":
      case "Text":
      case "TextStyleRange":
      case "Line":
        selObj.characters[0].leadingAki = spBf;
        if(selObj.characters[-1].contents != " "){//欧文スペース
          selObj.characters[-1].trailingAki = spAf;
        }
        else{
          selObj.characters[-2].trailingAki = spAf;
        }
        break;
      case "Paragraph":
        selObj.characters[0].leadingAki   = spBf;
        selObj.characters[-1].trailingAki = spAf;
        break;
      default: alert("対象外オブジェクトです");
      }//switch
    }
    else {
      switch(selWho){
        case "Word":
        case "Text":
        case "TextStyleRange":
          for(var ln=0; ln < selObj.lines.length; ln++){
            selObj.characters[0].leadingAki = spBf;    //1文字目
            if(ln!=0){
              selObj.lines[ln].characters[0].leadingAki = spBf;//2行目以降1文字目
            }
            //3行以上であいだの行、2行ならスキップ
            if(ln!=selObj.lines.length){
              if(selObj.lines[ln].characters[-1].contents != " "){//欧文スペース
                selObj.lines[ln].characters[-1].trailingAki = spAf;
              }
              else{
                selObj.lines[ln].characters[-2].trailingAki = spAf;
              }
            }
          }//for 3行以上のとき
          if(selObj.characters[-1].contents != " "){//欧文スペース
            selObj.characters[-1].trailingAki = spAf;
          }
          else {
            selObj.characters[-2].trailingAki = spAf;
          }
          selObj.lines[0].characters[-1].trailingAki = spAf;
          break;
        case "Line":
          for(var ln=0; ln < selObj.lines.length; ln++){
            selObj.lines[ln].characters[0].leadingAki = spBf;
            if(selObj.lines[ln].characters[-1].contents != " "){//欧文スペース
              selObj.lines[ln].characters[-1].trailingAki = spAf;
            }
            else {
              selObj.lines[ln].characters[-2].trailingAki = spAf;
            }
          }
          break;
        case "Paragraph":
        case "TextColumn":
          for(var ln=0; ln < selObj.lines.length; ln++){
            selObj.lines[ln].characters[0].leadingAki = spBf;
            selObj.lines[ln].characters[-1].trailingAki = spAf;
          }
          break;
        default: alert("対象外オブジェクトです"); break;
      }//switch
    }//else
  if(resetAki == true){
    selObj.leadingAki  = -1;
    selObj.trailingAki = -1;
  }
}//function
