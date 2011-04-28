//選択オブジェクトのテキスト連結解除する
var sel=app.selection;

unlinkTextFrame(sel);

function unlinkTextFrame(sel){
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
			var targetFrame=sel[i].parentStory.textContainers;
			for(var j=targetFrame.length-1; j >0; j--){
				targetFrame[j].previousTextFrame=NothingEnum.NOTHING;
				}
			break;

		case "Group":
			unlinkTextFrame(sel[i].textFrames);
			break;

		default: break;
		}
	}
}
