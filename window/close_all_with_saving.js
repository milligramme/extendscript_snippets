/*
Close all documents with saving
for Photoshop, Illustrator, InDesign
*/
switch(app.name){
	case "Adobe Photoshop":
	case "Adobe Illustrator":
	while (app.documents.length > 0){
		try {
			app.activeDocument.close(SaveOptions.SAVECHANGES);
			// if document has not saved yet, saving dialog appear
		}
		catch(e){
			// if saving dialog was canceled
			alert("saving document was canceled by user");
			break;
		}
	}
	break;

	case "Adobe InDesign":
	while (app.documents.length > 0){
		var doc = app.documents[0];
		if (has_fullpath (doc)) {
			doc.close(SaveOptions.yes);
		}
		else {
			// alert("Document doesn't saved yet. Saving document was canceled");
			saved  = doc.save();
      // $.writeln(saved.name);
			if (saved) {
				doc.close();
			}
			else {
				exit();
			};
		}
	};
	break;
}

function has_fullpath (doc) {
	return doc.properties['fullName'] !== undefined
}
