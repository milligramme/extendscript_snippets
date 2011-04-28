/**
 * get nested character styles from paragraph style 
 */
get_nested_char_style(app.selection[0].appliedParagraphStyle);

function get_nested_char_style (p_style) {
	var nst_arr = [];
	var nst_style = p_style.nestedStyles;
	for (var i=0; i < nst_style.length; i++) {
		nst_arr.push(nst_style[i].appliedCharacterStyle);
	};
	return nst_arr
}
