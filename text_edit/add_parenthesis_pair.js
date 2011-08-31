/**
 *  add parenthesis
 *  
 *  2010-11-22.
 */
#targetengine "session"
if (app.documents.length === 0){
  exit();
}
var pare_arr = [
  "（）", //0
  "「」", //1
  "【】", //2
  "《》", //3
  "『』", //4
  "“”", //5
  "〝〟", //6
  "［］", //7
  "｛｝", //8
  "〔〕", //9
  "〈〉", //10
  // "" //11
  ];

//selection option
//0: select source text with parenthesis, 1: insert cursole into forward of source text
var after_touch = 1;

var plt = new Window('palette', "Wrap with?", undefined);
plt.bt_grp1 = plt.add('group');
plt.bt_grp2 = plt.add('group');
plt.bt_grp3 = plt.add('group');

var par00_btn = plt.bt_grp1.add('button', [0,0,23,23], pare_arr[0]);
var par01_btn = plt.bt_grp1.add('button', [0,0,23,23], pare_arr[1]);
var par02_btn = plt.bt_grp1.add('button', [0,0,23,23], pare_arr[2]);
var par03_btn = plt.bt_grp1.add('button', [0,0,23,23], pare_arr[3]);
var par04_btn = plt.bt_grp2.add('button', [0,0,23,23], pare_arr[4]);
var par05_btn = plt.bt_grp2.add('button', [0,0,23,23], pare_arr[5]);
var par06_btn = plt.bt_grp2.add('button', [0,0,23,23], pare_arr[6]);
var par07_btn = plt.bt_grp2.add('button', [0,0,23,23], pare_arr[7]);
var par08_btn = plt.bt_grp3.add('button', [0,0,23,23], pare_arr[8]);
var par09_btn = plt.bt_grp3.add('button', [0,0,23,23], pare_arr[9]);
var par10_btn = plt.bt_grp3.add('button', [0,0,23,23], pare_arr[10]);
var par11_btn = plt.bt_grp3.add('button', [0,0,23,23], pare_arr[11]);

//callback (duplicated)
par00_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par01_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par02_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par03_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par04_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par05_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par06_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par07_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par08_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par09_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}
par10_btn.onClick = function(){
  wrap_with_parenthesis (app.selection[0], this.text, after_touch);
}

plt.show();

/**
 * wrap with parenthesis
 * 
 * @param {Object} sel TextObject (exclude InsertionPoint)
 * @param {String} with_what Parenthesis pair
 * @param {Number} after_touch 0: Select with parenthesis, 1: Insert after parenthesis
 */
function wrap_with_parenthesis (sel, with_what, after_touch) {
  if (sel.hasOwnProperty('baseline') && sel.constructor.name !== 'InsertionPoint') {
    if (check_if_return(sel.contents) === 0) {
      return
    };
    else{
      var mode = check_if_return(sel.contents);
    }
    sel.insertionPoints[-mode].contents = with_what;
    var sel2 = app.selection[0];// sel + with_what(st, en)
    sel2.characters[-mode -1].duplicate(LocationOptions.before, sel2.insertionPoints[0]);//with_what(st) + sel + with_what(st, en)
    sel2.characters[-mode].remove(); // with_what(st) + sel + with_what(en)
    if (after_touch === 0) {
      app.selection = sel2.insertionPoints[-mode];
    }
    else if (after_touch === 1){
      app.selection = sel2.texts[0];
    }
  };
}
/**
 * check tail is return?
 * 
 * @param {String} str any string
 * @returns {Number} 0: for dont work, 2: returns, 1: others
 */
function check_if_return (str) {
  if (str.length > 1 && str.charCodeAt(str.length-1).toString(16) === "d"){
    return 2
  } //return
  if (str.length > 1 && str.charCodeAt(str.length-1).toString(16) === "a"){
    return 2
  } //forced line break
  if (str.length === 1 && str.charCodeAt(str.length-1).toString(16) === "d"){
    return 0
  }
  if (str.length === 1 && str.charCodeAt(str.length-1).toString(16) === "a"){
    return 0
  }
  else{
    return 1
  } //other character
}