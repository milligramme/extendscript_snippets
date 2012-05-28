/**
 * does named style exist?
 * 
 * @param {Object} app_or_doc app or app.documents[0]
 * @param {String} style Instance
 * @param {String} name Style name to check
 * @param {Boolean} include_group if true can use stylegroupname::stylename for name
 *  
 */
var check_style_existence = function (app_or_doc, style, name, include_group) {
  var flg = false;

  if (include_group) {
    var _grp = style.replace(/Styles$/,"StyleGroups");
    var style_group = app_or_doc[_grp];
    for (var i=0, iL=style_group.length; i < iL ; i++) {
      var obj_style = style_group[i][style];
      for (var j=0, jL=obj_style.length; j < jL ; j++) {
        if ([ style_group[i].name, obj_style[j].name ].join("::") == name) {
          flg = true;
        };
      };
    };
  }
  else {
    var _all_style = "all" + style[0].toUpperCase() + style.slice(1);
    var style_ary = app_or_doc[_all_style];
    for (var i=0, iL=style_ary.length; i < iL ; i++) {
      if (style_ary[i].name == name) {
        flg = true;
      };
    };
  }
  return flg;
}
