/**
 *  which column Selection text is belonging to
 */
if (app.selection.length === 1 && app.selection[0].hasOwnProperty('baseline')) {
	var sel = app.selection[0];
	alert(which_column(sel));
};

function which_column(sel){
	var sel_indx = sel.texts[0].index;
	var parent_tx_column = sel.parentTextFrames[0].textColumns;
	var columns_count = sel.parentTextFrames[0].textFramePreferences.textColumnCount;
	for (var i=0, iL=parent_tx_column.length; i < iL ; i++) {
		if (sel_indx < parent_tx_column[i].characters[-1].index){
			var is_span_column = sel.spanColumnType === SpanColumnTypeOptions.SPAN_COLUMNS ? " (SpanColumn)" : "";
			var result = "in Column No."+(i+1)+is_span_column;
			return result
		}
	};
};
