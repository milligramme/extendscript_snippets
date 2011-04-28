var selObj = app.selection[0];
$.localize = true;
var result = get_lines_intext (selObj);
var enline = result === 1 ? 'Line ' : 'Lines ';
alert({en:enline + result, ja:result + "行目です"});

/**
 * return line number
 * 
 * @param {Object} targetObj InsertionPoint, Character, Word...
 * @returns {Number} Line number
 */
function get_lines_intext (targetObj) {
	var lineObj = targetObj.lines[0];
	if (lineObj.parent.constructor.name === "Cell") {
		var parentLineObj = targetObj.parent.texts[0].lines;
	}
	else{
		var parentLineObj = targetObj.parentTextFrames[0].texts[0].lines;		
	}	
	for (var i=0, iL=parentLineObj.length; i < iL ; i++) {
		if (parentLineObj[i].index === lineObj.index){
			return i+1;
		}
	};
}