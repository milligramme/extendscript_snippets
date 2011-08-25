/**
 * find and change template
 */
var target_obj = app.documents[0];

//===================================================
var find_txt_obj = {
  findWhat : "find",
  };

var change_txt_obj = {
  changeTo : "change",
  };
textFindAndChange(target_obj, find_txt_obj, change_txt_obj);

//===================================================
var find_grep_obj = {
  findWhat : "[A-Z]"
  }
var change_grep_obj = {
  changeTo : "0",
  pointSize : 36
  }
// grepFindAndChange(target_obj, find_grep_obj, change_grep_obj);

//===================================================
function textFindAndChange(target_obj, find_txt_obj, change_txt_obj){
  app.findTextPreferences = NothingEnum.nothing;
  app.changeTextPreferences = NothingEnum.nothing;

  with(app.findChangeTextOptions){
    caseSensitive               = false;
    includeFootnotes            = false;
    includeHiddenLayers         = false;
    includeLockedLayersForFind  = false;
    includeLockedStoriesForFind = false;
    includeMasterPages          = false;
    kanaSensitive               = true;
    wholeWord                   = false;
    widthSensitive              = true;
  }
  app.findTextPreferences.properties = find_txt_obj;
  app.changeTextPreferences.properties = change_txt_obj;
  target_obj.changeText();
  
  app.findTextPreferences = NothingEnum.nothing;
  app.changeTextPreferences = NothingEnum.nothing;
  }

function grepFindAndChange(target_obj, find_grep_obj, change_grep_obj){
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
  app.findGrepPreferences.properties = find_grep_obj;
  app.changeGrepPreferences.properties = change_grep_obj;
  target_obj.changeGrep();

  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;
  }
/*
with(app.findChangeGlyphOptions){
  caseSensitive               = true;
  includeFootnotes            = false;
  includeHiddenLayers         = false;
  includeLockedLayersForFind  = false;
  includeLockedStoriesForFind = false;
  includeMasterPages          = false;
}

with(app.findChangeTransliterateOptions){
  caseSensitive               = true;
  includeFootnotes            = false;
  includeHiddenLayers         = false;
  includeLockedLayersForFind  = false;
  includeLockedStoriesForFind = false;
  includeMasterPages          = false;
  kanaSensitive               = true;
  wholeWord                   = false;
  widthSensitive              = true;
}
  */

