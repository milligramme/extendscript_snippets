var doc = app.documents[0];
app.findTextPreferences = null;
var zoom = app.activeWindow.zoomPercentage;

app.findTextPreferences.findWhat = "anytext";
//found collection
var result = app.findText();

for (var i=0; i < result.length; i++) {
	result[i].select();
	app.activeWindow.zoomPercentage = 400;
	alert(app.findTextPreferences.findWhat + " was found " + (i+1) + "/" + result.length);
};
app.activeWindow.zoomPercentage = zoom;