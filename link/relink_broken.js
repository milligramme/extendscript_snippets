var doc_obj = app.documents[0];
var ex_path = doc_obj.filePath + "/" + "linklist.txt";

var conf = confirm("yes: export // no: import");

if (conf) {
	//export mode
	var export_link = new File(ex_path);
	if ( export_link ){
		if( export_link.open('w') ){
			var link_info_array = [];
			var link_obj = doc_obj.links;
			for (var li=0, liL=link_obj.length; li < liL ; li++) {
				var link_array = [];
				var fp_id = link_obj[li].id
				var fp = link_obj[li].name;
				var fp_rep = fp.replace(/[^0-9A-za-z_-\\.]/g,"_");
				var stat = link_obj[li].status === LinkStatus.LINK_MISSING ? "x" : "";
				export_link.writeln(stat + "\t" + fp_id + "\t" + fp + "\t" + fp_rep );
			}
		};
	}
}
else{
	//import mode
	var sel_folder = Folder.selectDialog("select folder included images to replace");
	if ( sel_folder ) {
		var fol = sel_folder.fsName;
	}else{
		alert("exit");
	}
	if( File(ex_path) ){
		var import_link = new File(ex_path);
		if ( import_link.open('r') ) {
			var arr = [];
			while( !import_link.eof ){
				arr.push(import_link.readln().split('\t') );
			}
			import_link.close();
		}
		link_obj = doc_obj.links;
		for (var li=0, liL=link_obj.length; li < liL ; li++) {
			if (arr[li][0] === "x") {
				try{
					link_obj[li].relink( File(fol + "/" + arr[li][3]) );	
				}
				catch(e){alert(e);continue;}
				link_obj.everyItem().update();
			};
		}
		
	}
}