/**
 * export inx, import inx, create clean indd
 * to cleanup infected infomation
 */
function inx_export_conv_to_indd () {
  //select folder (include infected indd document)
  var src_folder = Folder.selectDialog("Select folder to clean up");
  if (src_folder == null) {return};
  //folder path
  var indd_folder_path = src_folder.fsName;

  //get indd filelist
  var indd_file_list = File(indd_folder_path).getFiles(
    function (file){ return /^[^\.]+\.indd$/i.test(file.name);}
    );
  //open indd in hidden mode
  for (var i=0, iL=indd_file_list.length; i < iL ; i++) {
    var doc_obj_src = app.open(indd_file_list[i], false);
    //export inx
    var inxPath = indd_folder_path + "/" + doc_obj_src.name.replace(/\.indd$/,".inx");
    doc_obj_src.exportFile( ExportFormat.INDESIGN_INTERCHANGE, File(inxPath) );
    //backup original to backup folder
    Folder(indd_folder_path + "/backup/").create();
    doc_obj_src.save( File (indd_folder_path + "/backup/" + doc_obj_src.name.replace(/\.indd$/,"_backup.indd") ) );
    doc_obj_src.close(SaveOptions.NO);
  };

  //get inx filelist
  var inx_file_list = File(indd_folder_path).getFiles(
    function (file){ return /^[^\.]+\.inx$/i.test(file.name);}
    );
  //open inx in hidden mode
  for (var ii=0, iiL=inx_file_list.length; ii < iiL ; ii++) {
    var doc_obj = app.open(inx_file_list[ii], false);
    var indd_path = indd_folder_path + "/" + inx_file_list[ii].name.replace(/\.inx$/,".indd");
    doc_obj.save( File(indd_path) );
    if(doc_obj){
      alert("\"" + doc_obj.name + "\": " + "conversion has succeeded.")
    }
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALERTS;
    doc_obj.windows.add();
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
    // doc_obj.close(SaveOptions.NO);
  };
}
