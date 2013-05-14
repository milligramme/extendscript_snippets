/**
 * return line number
 * 
 * @param {Object} target_obj InsertionPoint, Character, Word...
 * @returns {Number} Line number
 */

var get_current_line = function() {
  $.localize = true;
  if (app.selection.length !== 1 ) {return};
  
  var sel_obj = app.selection[0];
  if (! sel_obj.hasOwnProperty('baseline')) {alert("テキストじゃないね"); return};
  
  var result = get_lines_intext (sel_obj);
  var enline = result === 1 ? 'Line ' : 'Lines ';
  alert({en:enline + result, ja:result + "行目です"});
 
  function get_lines_intext (target_obj) {
    var line_obj = target_obj.lines[0];
    if (line_obj.parent.constructor.name === "Cell") {
      var parent_line_obj = target_obj.parent.texts[0].lines;
    }
    else{
      var parent_line_obj = target_obj.parentTextFrames[0].texts[0].lines;    
    }  
    for (var i=0, iL=parent_line_obj.length; i < iL ; i++) {
      if (parent_line_obj[i].index === line_obj.index){
        return i+1;
      }
    };  
  }
};

// run
get_current_line();