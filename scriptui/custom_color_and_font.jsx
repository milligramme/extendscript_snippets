var scriptui_bgcolor = function(t, rgb, opacity) {
  var opacity = opacity || 1;
  t.graphics.backgroundColor = t.graphics.newBrush (
    t.graphics.BrushType.SOLID_COLOR, rgb
    );
  t.opacity = opacity;
  return t;
};

var scriptui_fgcolor = function(t, rgb, opacity) {
  var opacity = opacity || 1;
  t.graphics.foregroundColor = t.graphics.newPen (
    t.graphics.PenType.SOLID_COLOR, rgb, 1
    );
  t.opacity = opacity;
  return t;
};

var scriptui_setfont = function(t, font, style, size) {
  t.graphics.font = ScriptUI.newFont (font, style, size);
  return t;
};
