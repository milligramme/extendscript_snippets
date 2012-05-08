#targetengine "m-session"
/**
 *  $.writeln for app
 * 
 */
var watcher = create_console();
watcher.show();

function create_console () {
  var win = new Window('window', 's.writeln');
  // win.margins = 5;
  win.p_store = win.add('edittext', [0,0,270,180], "", {multiline: true});
  return win;
}
/**
 * @param {String} logs any string
 */
function swriteln (logs) {
  watcher.p_store.text = logs+"\n" + watcher.p_store.text;
  watcher.p_store.active = true;
}

