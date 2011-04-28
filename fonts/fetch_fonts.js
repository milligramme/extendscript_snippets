/**
 * fetching fonts
 *
 * 2010-11-10 mg
 *
 * target indesign cs3, cs4
 */
 
//******************************************************
// set mode
// doc_select_mode = 0;//select folder and extract document(s) mode
// doc_select_mode = 1;//opened document(s) mode
//
// save_dir_mode = 2; //create folder same as document
// save_dir_mode = 4; //create each folders on desktop
 
var doc_select_mode = 1;// 0, 1
var save_dir_mode   = 4;// 2, 4
 
//******************************************************
switch(doc_select_mode){
	case 0: sel_folder_mode (); break;
	case 1: opened_doc_mode (); break;
	default: ; break;
}
 
//select folder and extract document(s) mode --0
function sel_folder_mode () {
	var doc_folder = Folder.selectDialog("Select folder to fetch fonts");
	if (doc_folder === null) {
		return
	}
	var fol_path = new File(doc_folder).fsName;
	var indd_list = File(fol_path).getFiles(
	 	function (file){ return /^[^\.]+\.indd$/i.test(file.name);}
	 	);
	for (var i=0, iL=indd_list.length; i < iL ; i++) {
		var doc = app.open(indd_list[i], true);
		fetch_font (doc, save_dir_mode);
		doc.close();
	};
};
 
//opened document(s) mode --1
function opened_doc_mode () {
	if(app.documents.length === 0){
		alert("nothing opened");
		return
	}
	var docs = app.documents;
	//remember document path
	var doc_list = [];
	
	var can = 0;
	while (docs.length > 0) {
		var a_doc = app.activeDocument;
		if(a_doc.saved === false){
      		alert("not yet saved");
			var sv_path =  File.saveDialog('choose to save');
			if(sv_path !== null){
				if(sv_path.toString().match('\.indd$') ){
					a_doc.save(new File(sv_path));
				}
				else{
				  a_doc.save(new File(sv_path+".indd"));
				}
			}
			else{
				return
				// can++;
				// continue;
			}
		}
		//modified?
		if(docs.everyItem().modified.toString().indexOf('true') !== -1){
			alert('please save modified document(s)');
			return
		}
		doc_list.push(a_doc.fullName);
		
		fetch_font (a_doc, save_dir_mode);
		a_doc.close();
	};
	// if (can > 0) {
	// 	var s = can === 1 ? " is" : "s are";
	// 	alert(can+"document" + s + " canceled");
	// };
	//re-open
	for (var dl=0, dlL=doc_list.length; dl < dlL ; dl++) {
		app.open(File(doc_list[dl]), true);
	};
}
 
/**
 * create folder for fetching fonts
 *
 * @param {Document} doc Document
 */
function fetch_font (doc, save_dir_mode) {
	if (save_dir_mode === 2) {
		//fetch to the folder as same as document's directory
		var path = doc.filePath+"/F_"+doc.name.toString().replace(/\.indd$/,"");
	};
	// else if (save_dir_mode === 3) {
	//  //fetch to single folder on desktop
	//  var path = "~/Desktop/"+"F_";
	// };
	else if (save_dir_mode === 4) {
		//fetch to each folders on desktop
		var d = "_" + new Date().getTime().toString(16).slice(11-4,11);
		var path = "~/Desktop/"+"F_"+doc.name.toString().replace(/\.indd$/,"") + d;
	};
	var fol_path = new File(path);
	var fol = new Folder(fol_path).create();
	if (fol) {
		createPackage( fol_path, doc );
		File(path + "/" + doc.name).remove();
	};
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
	var copyingLinkedGraphics = false;
	var copyingProfiles = false;
	var updatingGraphics = false;
	var includingHiddenLayers = false;
	var ignorePreflightErrors = true; //cs4
	var creatingReport = false;
	var versionComments = "";
	var forceSave = false;
	switch(app.version.split('.')[0]){
		case "6":
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
			break;
		case "5":
			app.activeDocument.packageForPrint (
				to,
				copyingFonts,
				copyingLinkedGraphics,
				copyingProfiles,
				updatingGraphics,
				includingHiddenLayers,
				creatingReport,
				versionComments,
				forceSave
				);
			break;
		default: ; break;
	}
}