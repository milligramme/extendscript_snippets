/**
 *  export pdf and package indd
 * 
 * Run for saved and validated document(s) 
 * choose folder to save pdf and packaged items
 * pdf is contain package folder (named with document name)
 *  
 *  Created by mg on 2010-09-29.
 */
(function () {
	if(app.documents.length === 0){
		exit();
	}
	var docObj = app.documents;//has many
	//set folder distination, creat folder for each documents
	dirFolder = Folder.selectDialog ( "choose folder for saving package folder" );
	if(dirFolder === null){
		exit(); //cancel process
	}
	else{ //dirFolder is choosen
		for (var i= docObj.length - 1; i >= 0; i--) { //loop 
			var pdfExPreset = undefined;//app.pdfExportPresets.item("MagazineAds_1v3(Ads)");
			dir = new File( dirFolder + "/" + decodeURI(docObj[i].name) + "/" );
			flg_dir = new Folder (dir).create();
			if ( flg_dir === true){
				exportPDF ( dir, docObj[i], pdfExPreset );
				createPackage ( dir, docObj[i] );
			}//if
			
			//to close document without saving use below
			//docObj[i].close(SaveOptions.NO);
			
		}//for doc
	}//else
})();

/**
 * export pdf
 * 
 * @param {Object} dir Folder to Export
 * @param {Document} doc Document
 * @param {Object} pdfExPreset PDF Export Preset
 */
function exportPDF( dir, doc, pdfExPreset ){
	var pdfName = File ( dir + "/" + doc.name.replace(/(\.indd$|\$)/,".pdf") );
	var showingOptions = false;
	var pdfExportPreset = pdfExPreset;
	var withGrids = false
	var versionComments = "";
	var forceSave = false;
	
	doc.exportFile ( 
		ExportFormat.PDF_TYPE, 
		pdfName, 
		showingOptions, 
		pdfExportPreset, 
		withGrids, 
		versionComments, 
		forceSave
		);
}
/**
 * create package
 * 
 * @param {Object} dir Folder to Export
 * @param {Document} doc Document
 */
function createPackage( dir, doc ){
	var to = dir;

	var copyingFonts = true;
	var copyingLinkedGraphics = true;
	var copyingProfiles = true;
	var updatingGraphics = true;
	var includingHiddenLayers = false;
	var ignorePreflightErrors = true;
	var creatingReport = true;
	var versionComments = "";
	var forceSave = false;

	app.activeDocument.packageForPrint (
		to, 
		copyingFonts, 
		copyingLinkedGraphics, 
		copyingProfiles, 
		updatingGraphics, 
		includingHiddenLayers,
		ignorePreflightErrors, 
		creatingReport, 
		versionComments,
		forceSave
		);
}