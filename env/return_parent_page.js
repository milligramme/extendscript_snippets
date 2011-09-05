/**
 * return parent page no with section marker
 * 
 * @param {Object} obj PageItem(TextFrame or Frame object such as Rectangle, Oval, Polygon...)
 * @returns {String} Page name 
 */
function return_parent_page(obj){
  if (app.version.split('.')[0] >= 7) {
    if (obj.parentPage !== null) {
      return obj.parentPage.appliedSection.name + obj.parentPage.name;
    }
    else {
      return "PB";
    }
  }
  else {
    var pc = obj.parent.constructor.name;
    switch(pc){
      case "Page":
        return obj.parent.appliedSection.name + obj.parent.name;
        break;
      case "Spread": // Pasteboard
        return "PB";
        break;
      case "Character": // Anchored Object
        return return_parent_page(obj.parent.parentTextFrames[0]);
        break;
      default:
        return return_parent_page(obj.parent);
        break;
    }
  }
}