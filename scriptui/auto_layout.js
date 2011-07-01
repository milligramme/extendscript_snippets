#targetengine "session"
var rsc = "window{ \
	orientation: 'row', \
	st: StaticText { }, \
	pb: Button {text:'Ok'}, \
	et: EditText {characters:44, justify:'right'}, \
	margins:[110,22,44,1], \
	spacing:50 \
	}";


var win = new Window(rsc);
win.show();