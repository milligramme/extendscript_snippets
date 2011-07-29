/*
全てのドキュメントを保存せずに閉じる
Photoshop, Illustrator, InDesign共用
*/ 
switch(app.name){
	case "Adobe Photoshop":
	case "Adobe Illustrator":
	while (app.documents.length > 0){
		app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	}; break;

	case "Adobe InDesign":
	while (app.documents.length > 0){
		app.activeDocument.close(SaveOptions.no);
	}; break;
}