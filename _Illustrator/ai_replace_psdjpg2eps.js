#target "Illustrator"
var doc = app.documents
for(var i = 0, L = doc.length ; i < L; i++){
  var place_item = doc[i].placedItems
  for(var ii = 0, LL = place_item.length; ii < LL; ii++){
    place_item[ii].lock = false;
    place_file_path = place_item[ii].file.toString().replace(/\.jpg|\.psd/,".eps");
    docede_path = File.decode(place_file_path);
    // $.writeln(docede_path)
    if(new File(docede_path)){
      place_item[ii].file = new File(docede_path);
    }
  }
}