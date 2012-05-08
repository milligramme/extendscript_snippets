#target "Illustrator"

var doc = documents[0];
var sw = doc.swatches;
for (var i = 0; i < doc.swatches.length; i++){
  $.writeln(sw[i].name);
}

var b = new CMYKColor ();
  b.black   = 100;
  b.ctan    = 0;
  b.magenta = 0;
  b.yellow  = 0;

var bsw = sw.add({color : b, name : "Black" });
$.writeln(bsw.color); // => [GrayColor]
$.writeln(b); // => [CMYKColor]
