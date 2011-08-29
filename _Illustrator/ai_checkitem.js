#target "Illustrator"
var check_obj = app.activeDocument;
var CR = String.fromCharCode(13);
var result = "";
for (i in check_obj) {
  try { result = result + i+" = "+check_obj[i] + CR; }
  catch(e){ result = result + CR; }
}
var page_obj = app.documents.add();
var txt_obj = page_obj.textFrames.add();
txt_obj.visibleBounds = ["2cm","2cm","27cm","19cm"];
txt_obj.contents = result;

