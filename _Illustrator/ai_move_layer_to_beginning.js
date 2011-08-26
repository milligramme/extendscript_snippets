#target "Illustrator"

var lay_obj1 = activeDocument.layers["AA"];
var lay_obj2 = activeDocument.layers["BB"];
for(var i=lay_obj1.pageItems.length-1; i>=0; i--){
  lay_obj1.pageItems[i].moveToBeginning(lay_obj2);
}