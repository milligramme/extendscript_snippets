/**
 * replace parenthesis pair
 */

// test
// app.documents[0].stories[0].paragraphs[0].select();

//config name
var conf_name = ".rep_parenthesis.txt";//invisible
var pare_arr = [
  "（　）", //0
  "「　」", //1
  "【　】", //2
  "《　》", //3
  "『　』", //4
  "“　”", //5
  "〝　〟", //6
  "［　］", //7
  "｛　｝", //8
  "〔　〕", //9
  "〈　〉", //10
  // "" //11
  ];//separate by zenkaku space, must be configured button layout, and callback func


//path to script panel folder
var scrt_fol = app.scriptPreferences.scriptsFolder;
var conf_file = new File( scrt_fol + "/" + conf_name );
conf_file.encoding = "UTF-8";
var conf_json = "";
if ( conf_file.open("r") ){
  conf_json += conf_file.read();
  if ( conf_json !== "" ) {
    var conf_obj = eval( conf_json );//eval("({key:value})")
  };
}
else{
  var conf_obj = {};
}

if (app.documents.length > 0 && app.selection.length === 1) {
  switch(app.selection[0].constructor.name){
    case "Character":
    case "Word":
    case "Line":
    case "TextStyleRange":
    case "Paragraph":
    case "Text":
    case "Story":
      //dialog function
      rem_dialog (conf_obj);
      break;
    default: exit(); break;
  }
};
/**
 * main dialog
 * 
 * @param {Object} conf_obj eval(json) 
 */
function rem_dialog (conf_obj) {
  var dlg = new Window('dialog', "Replace Parenthesis", undefined);
  dlg.panel = dlg.add('panel');
  var ddl = dlg.panel.add('dropdownlist', [0,0,120,30], pare_arr);

  // button layout
  dlg.panel.btn_group1 = dlg.panel.add('group');
  var btn1 = dlg.panel.btn_group1.add('button', [0,0,40,20], pare_arr[0], {name:'button1'});
  var btn2 = dlg.panel.btn_group1.add('button', [0,0,40,20], pare_arr[1], {name:'button2'});
  var btn3 = dlg.panel.btn_group1.add('button', [0,0,40,20], pare_arr[2], {name:'button3'});
  dlg.panel.btn_group2 = dlg.panel.add('group');
  var btn4 = dlg.panel.btn_group2.add('button', [0,0,40,20], pare_arr[3], {name:'button4'});
  var btn5 = dlg.panel.btn_group2.add('button', [0,0,40,20], pare_arr[4], {name:'button5'});
  var btn6 = dlg.panel.btn_group2.add('button', [0,0,40,20], pare_arr[5], {name:'button6'});
  dlg.panel.btn_group3 = dlg.panel.add('group');
  var btn7 = dlg.panel.btn_group3.add('button', [0,0,40,20], pare_arr[6], {name:'button7'});
  var btn8 = dlg.panel.btn_group3.add('button', [0,0,40,20], pare_arr[7], {name:'button8'});

  var btn9 = dlg.panel.btn_group3.add('button', [0,0,40,20], pare_arr[8], {name:'button9'});
  dlg.panel.btn_group4 = dlg.panel.add('group');
  var btn10 = dlg.panel.btn_group4.add('button', [0,0,40,20], pare_arr[9], {name:'button10'});
  var btn11 = dlg.panel.btn_group4.add('button', [0,0,40,20], pare_arr[10], {name:'button11'});
  var btn12 = dlg.panel.btn_group4.add('button', [0,0,40,20], undefined, {name:'button12'});

  //default value
  ddl.selection = conf_obj['place'] === undefined ? 0 : conf_obj['place'];
  // alert(ddl.selection)

  //button
  dlg.group = dlg.add('group');
  var can_btn = dlg.group.add('button',[0,0,60,30],"Cancel", {name:'cancel'});
  var reset_btn = dlg.group.add('button',[0,0,60,30],"Reset", {name:'reset'});

  //button function
  var dropdown, rep;
  btn1.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[0];
  }
  btn2.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[1];
  }
  btn3.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[2];
  }
  btn4.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[3];
  }
  btn5.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[4];
  }
  btn6.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[5];
  }
  btn7.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[6];
  }
  btn8.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[7];
  }
  btn9.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[8];
  }
  btn10.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[9];
  }
  btn11.onClick = function () {
    dlg.close();
    dropdown = ddl;
    rep = pare_arr[10];
  }
  btn12.onClick = function () {
    // dlg.close();
    // dropdown = ddl;
    //rep = pare_arr[11];
  }

  //cancel
  can_btn.onClick = function () {
    dlg.close();
  }

  //reset to default value
  reset_btn.onClick = function () {
    ddl.selection = 0;
  }

  dlg.show();
  if (dropdown !== undefined) {
    button_common(dropdown, rep);
  };
}

/**
 *  button common function
 * 
 * @param {Object} ddl DropDownList
 * @param {String} raplace_to word to change
 */
function button_common (ddl, replace_to) {
  var setting_obj = {};
  setting_obj['place'] = ddl.selection.index;
  var ex_conf = new File(scrt_fol + "/" + conf_name);
  if ( ex_conf.open("w") ) {
    ex_conf.write( setting_obj.toSource() );
  };
  var targetObj = app.selection[0];

  var find_what = ddl.selection.text;
  var start_tar = find_what.charAt(0);
  var end_tar = find_what.charAt(find_what.length-1);
  var start_rep = replace_to.charAt(0);
  var end_rep = replace_to.charAt(replace_to.length-1);
  var findGrepObj_st = {
    findWhat: start_tar
  };
  var changeGrepObj_st = {
    changeTo: start_rep
  };
  grepFindAndChange(targetObj, findGrepObj_st, changeGrepObj_st);
  var findGrepObj_en = {
    findWhat: end_tar
  };
  var changeGrepObj_en = {
    changeTo: end_rep
  };
  grepFindAndChange(targetObj, findGrepObj_en, changeGrepObj_en);
}
/**
 *  replace function
 * 
 * @param {Object} targetObj Document, Story, Selection
 * @param {Object} findGrepObj {findWhat, pointSize, and more... }
 * @param {Object} changeGrepObj {changeTo, pointSize, and more... }
 */
function grepFindAndChange(targetObj, findGrepObj, changeGrepObj){
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

  with(app.findChangeGrepOptions){
    includeFootnotes            = false;
    includeHiddenLayers         = false;
    includeLockedLayersForFind  = false;
    includeLockedStoriesForFind = false;
    includeMasterPages          = false;
    kanaSensitive               = true;
    widthSensitive              = true;
  }
  app.findGrepPreferences.properties   = findGrepObj;
  app.changeGrepPreferences.properties = changeGrepObj;

  targetObj.changeGrep();
  app.findGrepPreferences   = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;
}
