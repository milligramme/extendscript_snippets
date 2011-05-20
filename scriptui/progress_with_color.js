/**
 * progress will fade in!
 * using scriptUI graphic to change font size and color 
 */

#targetengine "session"
var w = new Window('window', "progress");
var counter = w.add('statictext', undefined, "");

// var c = "◐◓◑◒".split('');
// var c = "⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻".split('');
var c = "\\|/–".split('');

counter.characters = 2;
counter.justify = 'center';
counter.graphics.font = ScriptUI.newFont("Helvetica", "Bold", 240);
counter.graphics.foregroundColor = counter.graphics.newPen(w.graphics.PenType.SOLID_COLOR, [1,1,1], 1);

var draw_area = 100;
var ma = [
  app.marginPreferences.top,
  app.marginPreferences.left,
  app.marginPreferences.bottom,
  app.marginPreferences.right
  ];

var doc = app.documents.add();
var ddp = doc.documentPreferences;
with(ddp){
  pageWidth   = draw_area + ma[1] + ma[3];
  pageHeight  = draw_area + ma[0] + ma[2];
  facingPages = false;
}
doc.textFrames.add({
	geometricBounds : [ma[0], ma[1], draw_area+ma[0], draw_area+ma[1]]
,	contents : TextFrameContents.placeholderText
});

var story_obj = doc.stories[0];
var char_obj = story_obj.characters;
var char_ln = char_obj.length;
obs = [];
w.show();

for (var i = char_ln - 1; i >= 0; i--){
	try {
		var ob = char_obj[i].createOutlines(false)[0];
		obs.push(ob);
	} catch(e){}
	counter.text = c[ i%(c.length) ];
	counter.graphics.foregroundColor = counter.graphics.newPen(w.graphics.PenType.SOLID_COLOR, [(char_ln-i)/char_ln, i/char_ln,0], 1);
	if (i == 0) {
		counter.text = "*";
		// w.hide();
		// do something
	};
};


 