var w = new Window ('dialog', "Tabbed Panel", undefined);
var tpanel = w.add('tabbedpanel');
tpanel.preferredSize = [350,300];
var general = tpanel.add('tab', undefined, "Test1");
general.add('statictext', undefined, "within Test1 Tab");

var images = tpanel.add('tab', undefined, "Test2");
images.add('statictext', undefined, "within Test2 Tab");
tpanel.selection = images;

var buttons = w.add('group');
buttons.add ('button', undefined, "OK", {name: 'ok'});
w.show ();