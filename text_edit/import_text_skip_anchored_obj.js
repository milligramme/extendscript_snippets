/**
 *  place text 
 *  
 * 2011-02-15
 */

if ( app.documents.length !== 0 && app.selection.length ===1 ) {
	var doc_obj = app.documents[0];
	var sel_obj = doc_obj.selection[0];
	var sel_fr = sel_obj.parentTextFrames[0]; 
	
	// marker for place anchored objects
	var anch_tag = "[[an]]";
	
	if (sel_obj.hasOwnProperty('baseline')) {
		sel_obj.parentTextFrames[0].insertLabel('anch','master');
		
		// GOTO FUNC remove all text but exclude anchored objects
		var bk_frame = remain_anch (sel_obj);
		
		// GOTO FUNC import text source
		var imp_source = import_source ();
		if ( !imp_source ) {
			exit();
		}
		for (var i=0, iL=imp_source.length; i < iL ; i++) {
			sel_fr.parentStory.contents = imp_source.join('\r');
		};
		// sel_obj.select();
		
		var bk_frame_char = bk_frame.parentStory.characters;
		
		app.findTextPreferences = null;
		app.findTextPreferences.findWhat = anch_tag;
		var match_obj = sel_fr.parentStory.findText();

		for (var i=0, iL=match_obj.length; i < iL ; i++) {
			try {
				if (app.version.split(".")[0] >= 6) {
					bk_frame_char[i].duplicate(LocationOptions.BEFORE, match_obj[i]);					
				}
				else {
					bk_frame_char[i].duplicate(LocationOptions.AFTER, match_obj[i]);					
				}
			}catch(e){}
			if (bk_frame_char[i].isValid) {
				// SHIT !!
				// when CS4 LocationOptions.AFTER remove both tag and anchored obj
				// when CS3 LocationOptions.BEFORE remove both tag and anchored obj
				match_obj[i].remove();
			};
		};
		diff_num = bk_frame.parentStory.characters.length - match_obj.length;
		if (diff_num === 0) {
			bk_frame.remove();
			alert( "done." );
		}
		else {
			var result = diff_num > 0 ? Math.abs(diff_num) + " anchor(s) left" : Math.abs(diff_num) + " tag(s) left"
			alert( result );
		}
	};
};


/**
 * remain anchored object in story
 * 
 * @param {Object} sel TextObject
 * @returns {Object} Return textframe includes only anchored objects
 */

function remain_anch (sel) {
	var bk = sel.parentTextFrames[0].duplicate();
	// bk.insertLabel('anch','slave');
	var story_obj = bk.parentStory;
	story_obj.texts[0].select();
	
	// FUNC
	remove_otherthan_key(story_obj, String.fromCharCode("0xfffc"));
	return bk;
}



/**
 * import text source
 * 
 * @returns {Array} Text source as array
 */

function import_source () {
	var src_path = File.openDialog("choose");
	if (src_path !== null) {
		src_obj = new File(src_path);
		flg = src_obj.open("r");
		if (flg) {
			var src_arr = [];
			while ( ! src_obj.eof ) {
				src_arr.push(src_obj.readln());
			};
			src_obj.close();
			return src_arr
		};
	}
	else{
		return
	}
}

/**
 * remain keyword / remove other than key
 * 
 * @param {Object} sel Text Selection
 * @param {String} key Keyword
 * 
 * @example
 * var keyword = "any keyword";
 * var keyword = String.fromCharCode("0xfffc");
 * remove_otherthan_key(app.selection[0], keyword); 
 */

function remove_otherthan_key (sel, key) {
	if (sel == null) {
		return
	};
	var sel_con = sel.contents;
	var check_arr = [];

	var start_p = 0;
	for (var i=0, iL=sel_con.length; i < iL ; i++) {
		var an = sel_con.indexOf(key, start_p);
		if (an === -1) {
			break;
		};
		check_arr.push(an);
		start_p = an+1;
	};

	// $.writeln(check_arr); //index
	var char_obj = sel.characters;
	try	{
		char_obj.itemByRange(check_arr[check_arr.length-1]+1,-1).remove();	
	}
	catch(e){}
	
	char_obj = app.selection[0].characters; // define again after remove

	for (var ii = check_arr.length -1 ; ii >= 1; ii--){
		var start = check_arr[ii-1]+1
		var end = check_arr[ii]-1
		var range_char = char_obj.itemByRange( start, end );
		try {
			range_char.remove();			
		}catch(e){}
		
		char_obj = app.selection[0].characters; // define again after remove

	};
	if (check_arr[0] !== 0) {
		try {
			char_obj.itemByRange(0,check_arr[0]-1).remove();
		}catch(e){}
	};
}