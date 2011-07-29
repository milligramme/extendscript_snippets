#targetengine "session"
main();
function main(){
  var af_save = app.addEventListener("afterSave", git_indd, false);
}
function git_indd (myEvent){
  var doc = myEvent.parent;
  if (has_fullpath (doc)) {
    var cd_path = doc.fullName.parent;

    var receipt = "do shell script \"cd " + cd_path + "; git init; git add .; git commit -m 'update'\"";
    app.doScript(receipt, ScriptLanguage.APPLESCRIPT_LANGUAGE);
  };
}

/**
 * is document saved at least once?
 */
function has_fullpath (doc) {
	return doc.properties['fullName'] !== undefined
}
