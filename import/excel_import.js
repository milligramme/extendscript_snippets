/**
 * Excel import sample
 */
import_excel();

function import_excel () {
  var file_obj = File.openDialog("Choose Excel File...");
  if (file_obj == null){
    exit();
  };
  var flg = file_obj.open('r');
  file_obj.encoding = 'UTF-8';
  if (!flg){
    return
  }
  var doc = app.documents.length === 0 ? app.documents.add() : app.documents[0];
  for (var i=0, iL=100; i < iL ; i++) {
    if (app.excelImportPreferences.errorCode !== 0) {
      exit();
    };
    try {
      with (app.excelImportPreferences){
        // rangeName = "A1:C3"
        sheetIndex = i
        // sheetName
        showHiddenCells = false;
        preserveGraphics = true;
        tableFormatting = TableFormattingOptions.EXCEL_UNFORMATTED_TABLE;
        useTypographersQuotes = true;
      }

      var tf = doc.textFrames.add();
      tf.geometricBounds = [5+100*i, 5, 100+100*i, 100];
      tf.place(file_obj);
    }
    catch(e){
      // $.writeln(app.excelImportPreferences.errorCode);
      }
  };
  file_obj.close();
}
