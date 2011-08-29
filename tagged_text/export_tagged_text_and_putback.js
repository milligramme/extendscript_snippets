#include "hira_kana_upcase.js"

export_tagged_text_and_putback(app.selection[0].parentStory, "h_k_up");

/**
 * export tagged text, do something and put it back
 * 
 * @param {Object} story Story
 * @param {String} method Switch included .js
 * 
 * return Array to included js
 * included js must return String
 */
function export_tagged_text_and_putback (story, method) {
  var path = app.activeScript.parent;

  //export tagged text
  with(app.taggedTextExportPreferences){
    characterSet = TagTextExportCharacterSet.SHIFT_JIS;
    tagFrom = TagTextForm.VERBOSE;
  }
  var tmp_file = File( path + "/_tmp.txt" );
  story.exportFile(ExportFormat.TAGGED_TEXT, tmp_file);

  // read tagged text
  var a_arr = [];
  tmp_file.encoding = "SHIFT_JIS";
  if (tmp_file.open('r')) {
    while(! tmp_file.eof){
      a_arr.push( tmp_file.readln() );
    }
  };
  tmp_file.close();
  var src;
  
  switch(method){
    case "h_k_up": src = hira_kata_upcase (a_arr); break;
    // case "h2k": Do_something; break;
    // case "k2h": Do_something; break;
    default: ; bread;
  }

  var rev_file = File(path+"/_rest.txt");
  rev_file.encoding = "SHIFT_JIS";
  rev_file.lineFeed = "UNIX";
  rev_file.open('w');
  rev_file.write(src);
  rev_file.close();
  
  // import tagged text
  with(app.taggedTextImportPreferences){
    removeTextFormatting = false;
    styleConflict = StyleConflict.PUBLICATION_DEFINITION;
    useTypographersQuotes = true;
  }
  // remove original story and place new
  story.remove();
  story.parent.place(rev_file, /*showing-option*/false);
  
  // remove temp files
  tmp_file.remove();
  rev_file.remove();
}
