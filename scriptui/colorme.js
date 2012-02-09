// color my scriptui [window, palette, dialog] please
(function() {
  var u;
  var w = new Window('dialog', "color me", u);
  w.orientation = 'column';
  def = [0.9, 0.7, 0.7];
  w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, def);

  r_sld = w.add('slider', u, def[0], 0, 1);
  g_sld = w.add('slider', u, def[1], 0, 1);
  b_sld = w.add('slider', u, def[2], 0, 1);
  rgb_txt = w.add('statictext', u, [r_sld.value, g_sld.value, b_sld.value].join(", "));

  w.btn_g = w.add('group');
  var ok_btn  = w.btn_g.add('button', u, "this color", {name: "ok"});

  r_sld.onChanging = function() {
    w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [r_sld.value, g_sld.value, b_sld.value]);
    rgb_txt.text = [r_sld.value, g_sld.value, b_sld.value].join(", ");
  };
  g_sld.onChanging = function() {
    w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [r_sld.value, g_sld.value, b_sld.value]);
    rgb_txt.text = [r_sld.value, g_sld.value, b_sld.value].join(", ");
  };
  b_sld.onChanging = function() {
    w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [r_sld.value, g_sld.value, b_sld.value]);
    rgb_txt.text = [r_sld.value, g_sld.value, b_sld.value].join(", ");
  };

  var flg = false;
  ok_btn.onClick = function () {
    flg = true;
    w.close();
  }

  w.show();
  if (flg) {
    var now = new Date().getTime().toString();
    var file_path = "~/Desktop/rgb_"+now+".txt";
    var file = File(file_path);
    if (file.open("w")) {
      var param = "w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, ["+rgb_txt.text+"] );"
      file.writeln(param);
      file.close();
      var receipt = "do shell script \"open " + file_path + "\"";
      app.doScript(receipt, ScriptLanguage.APPLESCRIPT_LANGUAGE);
    };
  };
})();