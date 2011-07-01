//paragraph style test
//appliedParagraphStyle と applyParagraphStyle()


var doc = app.documents[0];
var tfr = doc.textFrames; //3 textframes exist
var p_style = doc.paragraphStyles.itemByName("blue");

tfr[0].parentStory.texts[0].applyParagraphStyle (p_style, false);
tfr[0].parentStory.insertionPoints[0].contents = "1::";

tfr[1].parentStory.texts[0].applyParagraphStyle (p_style, true);
tfr[1].parentStory.insertionPoints[0].contents = "2::";

tfr[2].parentStory.texts[0].appliedParagraphStyle = p_style;
tfr[2].parentStory.insertionPoints[0].contents = "3::";

