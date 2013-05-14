//選択オブジェクトのテキスト連結解除する
var unlink_textframe = function() {
  if (app.documents.length === 0) {return};
  if (app.selection.length === 0) {return};

  var sel = app.selection;
  unlink_textframe(sel);

  function unlink_textframe(sel){
    for(var i=0, iL=sel.length; i < iL; i++){
      switch(sel[i].constructor.name){
        case "InsertionPoint": 
        case "Character":
        case "Word":
        case "TextStyleRange":
        case "Line":
        case "Paragraph":
        case "TextColumn":

        case "TextFrame":
          var target_frame = sel[i].parentStory.textContainers;
          for(var j = target_frame.length-1; j >0; j--){
            target_frame[j].previousTextFrame=NothingEnum.NOTHING;
          }
          break;

        case "Group":
          arguments.callee(sel[i].textFrames);
          break;

        default: break;
      }
    }
  }
};

// run
unlink_textframe();