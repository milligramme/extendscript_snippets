var win = new Window('dialog',"Test",undefined,{resizeable: true});


win.edt = win.add('edittext', [0,0,240,60], {multiline: true})
win.btn = win.add('button',undefined,"resize");

win.sld = win.add('slider',[0,30,70,60],50,50,600);

win.btn.onClick = function () {
	s = new Date().getSeconds();
	m = new Date().getMinutes();
	h = new Date().getHours();
	win.bounds = [0, 0, s * 10, s * m * h /10];
	win.center();
}

win.sld.onChange = function () {
	win.bounds = [0, 0, win.sld.value * 1.0, win.sld.value * 1.0 ];
	win.center();
	this.layout.layout(true)
}

win.sld.onChanging = function () {
	win.edt.bounds = [0, 0, 1 + win.sld.value, 1 + win.sld.value]
}

win.center();
win.show();