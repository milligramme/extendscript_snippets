/**
 * find anchored object in target 
 * 
 * @param {Object} target_obj Document, Story, Selection
 * @returns {Array} Array of object, if not appeared, return Empty Array
 * 
 */
function find_anchored_obj (target_obj) {
  var find_txt_obj = {
    findWhat: "\\x{fffc}" //String.fromCharCode("0xfffc")
    };

  var match_list = find_grep(target_obj, find_txt_obj);
  if(match_list.length != 0){//アンカー付きオブジェクトがある CharacterObjectsを返す
    var anch_obj_arr = [];
    for (var ich = match_list.length-1; ich >= 0; ich--) {
      var anch_obj = match_list[ich].pageItems[0];
      anch_obj_arr.push(anch_obj);
    }
    //Do something here
    return anch_obj_arr;
  }
  else {
    return [];
    // alert("No anchored objects");
  }
}

function find_grep(target_obj, find_txt_obj){
  app.findGrepPreferences   = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

  with(app.findChangeGrepOptions){
    includeFootnotes            = true;
    includeHiddenLayers         = true;
    includeLockedLayersForFind  = true;
    includeLockedStoriesForFind = true;
    includeMasterPages          = true;
    kanaSensitive               = true;
    widthSensitive              = true;
  }
  app.findGrepPreferences.properties = find_txt_obj;
  var result = target_obj.findGrep();
  app.findGrepPreferences   = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;
  return result;
}

