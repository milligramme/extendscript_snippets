#target "Illustrator"
/**
 * compress and expand word
 * 
 *  2010-10-26 mg
 */

//check document. if not exitst, create it
if (app.documents.length === 0) {
  var doc_obj = app.documents.add();
}
else{
  var doc_obj = app.documents[0];
}

//show dialog
var ui = script_ui_dlg ();
if(ui !== undefined){
  var setword = ui[0];
  var font_family = ui[1];
  var font_size = ui[2];
  var cmp_dir = ui[3];
  
  //compress word 5 times
  compress_word ( doc_obj, setword, font_family, font_size, cmp_dir );
  compress_word ( doc_obj, setword, font_family, font_size, cmp_dir );
  compress_word ( doc_obj, setword, font_family, font_size, cmp_dir );
  compress_word ( doc_obj, setword, font_family, font_size, cmp_dir );
  compress_word ( doc_obj, setword, font_family, font_size, cmp_dir );

  //expand words
  expand_word(doc_obj);
}


/**
 * @param {Object} doc Document
 * @param {String} setword Word to outline
 * @param {String} font_family app.textFonts[n]
 * @param {Number} font_size Font size
 * @param {String} cmp_dir Compress direction
 */
function compress_word (doc, setword, font_family, font_size, cmp_dir) {
  font_size = font_size * 1;//string => number
  
  if (doc.selection.length === 0 && setword !== undefined) {
    var tf = doc.textFrames.add();
    tf.contents = setword;
    tf.textRange.paragraphs[0].textFont = app.textFonts.getByName( font_family );
    tf.paragraphs[0].size = font_size;
  }
  else{
    if(doc.selection.typename === "TextRange"){
      return
    }
    selObj = doc.selection[0];
    //if object is textframe type
    if(selObj.typename === "TextFrame"){
      var tf = selObj.duplicate();
    }
    else{
      return
    }
  }
  //create outlined => return group
  var outed_word = tf.createOutline();
  //remember original size
  var gBon = outed_word.geometricBounds;
  switch(cmp_dir){
    case "b"://compress both
      outed_word.height = 0.001 + Math.random() * 0.01;
      outed_word.width = 0.001 + Math.random() * 0.01;
      break;
    case "h"://height only
      outed_word.height = 0.001 + Math.random() * 0.01;
      break;
    case "w"://width only
      outed_word.width = 0.001 + Math.random() * 0.01;
      break;
    default: ; break;//dont compress
  }
  //set label
  outed_word.name = gBon.toString();
  outed_word.selected = false;
}

/**
 * @param {Object} doc Document 
 */
function expand_word (doc) {
  var pgItem = doc.pageItems;
  for (var i=0, iL=pgItem.length; i < iL ; i++) {
    if (pgItem[i].name.match(/(\-?\d+\.?\d+\,?)+/)){
      //load pageitem's label as geometric bounds array
      var gBon = pgItem[i].name.split(",");
      //restore to original size
      pgItem[i].height = Math.abs(gBon[3]- gBon[1]);
      pgItem[i].width = Math.abs(gBon[2]- gBon[0]);
      //remove labels
      pgItem[i].name = "";
    }
  };
}
/**
 * @returns {Array} [word, font, size, dir] 
 */
function script_ui_dlg () {
  var fon = app.textFonts
  var fon_arr = [];
  for (var i=0, iL=fon.length; i < iL ; i++) {
    fon_arr.push(fon[i].name);
  };
  siz_arr = [12,14,16,18,21,24,28,36,48,60,72,96,108,120,180];
  dir_arr = ["both", "height", "width"];

  var dlg = new Window('dialog', "compress/expand word", undefined);
  dlg.panel = dlg.add('panel', undefined, "Nothing is selected Option");
  dlg.panel.alignChildren = "left";
  dlg.panel.group1 = dlg.panel.add('group');
    dlg.panel.group1.add('statictext', undefined, "Word: ");
    var textarea = dlg.panel.group1.add('edittext', [60,0,240,30], "Glitch");
  dlg.panel.group2 = dlg.panel.add('group');
    dlg.panel.group2.add('statictext', undefined, "Font: ");
    var fon_ddlist = dlg.panel.group2.add('dropdownlist',[60,0,240,30], fon_arr);
  dlg.panel.group3 = dlg.panel.add('group');
    dlg.panel.group3.add('statictext', undefined, "Size: ");
    var siz_ddlist = dlg.panel.group3.add('dropdownlist',undefined, siz_arr);
    dlg.panel.group3.add('statictext', undefined, "Pt");

  dlg.panel2 = dlg.add('panel', undefined, "Compress Direction");

  dlg.panel2.group4 = dlg.panel2.add('group');
    dlg.panel2.group4.add('statictext', undefined, "Compress: ");
    var dir1_rdbtn = dlg.panel2.group4.add('radiobutton', undefined, dir_arr[0]);
    var dir2_rdbtn = dlg.panel2.group4.add('radiobutton', undefined, dir_arr[1]);
    var dir3_rdbtn = dlg.panel2.group4.add('radiobutton', undefined, dir_arr[2]);

  //selection default dropdownlist and radiobutton
  fon_ddlist.selection = 0;
  siz_ddlist.selection = siz_arr.length-1;
  dir1_rdbtn.value = false;
  dir2_rdbtn.value = true;
  dir3_rdbtn.value = false;

  dlg_button = dlg.add('group');
  var ok_btn = dlg_button.add('button', undefined, "OK", {name:'ok'});
  var cancel_btn = dlg_button.add('button', undefined, "Cancel", {name:'cancel'});

  ok_btn.onClick = function() {
    flg = true;
    dlg.close();
  };
  cancel_btn.onClick = function() {
    flg = false;
    dlg.close();
  };
  dlg.show();
  dlg.center();

  if (flg) {
    var dir;
    var s_text = textarea.text;
    var f_name = fon_ddlist.selection.text;
    var size_f = siz_ddlist.selection.text;
    if(dir1_rdbtn.value){dir = "b";}
    if(dir2_rdbtn.value){dir = "h";}
    if(dir3_rdbtn.value){dir = "w";}
    return [s_text, f_name, size_f, dir];
  };
}