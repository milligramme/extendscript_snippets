#target "Illustrator"

/**
 * mask placed items
 */

(function(){
  var doc = app.documents.length === 0 ? (function () {alert("open any document");})() : app.documents[0];
  if (! doc) {return};

  var sel = app.selection;
  for (var si=0, siL=sel.length; si < siL ; si++) {
    if (sel[si].typename === "PlacedItem") {
      var pic_top  = sel[si].top;
      var pic_left = sel[si].left;
      var pic_w    = sel[si].width;
      var pic_h    = sel[si].height;
      var rect = doc.pathItems.rectangle(pic_top, pic_left, pic_w, pic_h);
      rect.filled   = false;
      rect.stroked  = false;
      rect.selected = false;
      rect.clipping = true;
      var gr = doc.groupItems.add();
      gr.move(sel[si], ElementPlacement.PLACEBEFORE)
      rect.move(gr, ElementPlacement.PLACEATBEGINNING);
      sel[si].move(gr, ElementPlacement.PLACEATEND);
      gr.clipped = true;
    };
  };
})()
