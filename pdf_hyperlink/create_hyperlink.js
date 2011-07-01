main();

function main() {
    with (app.findChangeGrepOptions) {
        includeFootnotes = true;
        includeHiddenLayers = false;
        includeLockedLayersForFind = false;
        includeLockedStoriesForFind = false;
        includeMasterPages = true;
    }
    app.findGrepPreferences = null;
    // URL
    app.findGrepPreferences.findWhat = '\\<(http|www)\\S*\\>';
    var myURLs = app.activeDocument.findGrep();
    makeHyperlink('http://', myURLs);
    // email
    app.findGrepPreferences.findWhat = '\\<\\S*@\\S*\\.\\w{2,3}\\>'; // '\\^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2, 4}\\>'
    var myEmails = app.activeDocument.findGrep();
    makeHyperlink('mailto:', myEmails);
}

function makeHyperlink(aPrefix, myArray) {
    for (var i = myArray.length-1; i >= 0; i-- ) {
        try{
            var aString = aPrefix + myArray[i].contents.replace(aPrefix,  '')
            var myHyperlinkTextSource = app.activeDocument.hyperlinkTextSources.add(myArray[i]);
            var myHyperlinkDestination = app.activeDocument.hyperlinkURLDestinations.add({destinationURL:aString});
            var myHyperlink = app.activeDocument.hyperlinks.add({source:myHyperlinkTextSource,   destination:myHyperlinkDestination});
            //myHyperlink.visible = true;
        }
        catch(e){}
    }
}