#target "Illustrator"
var doc = app.documents
for(var i = 0, L = doc.length ; i < L; i++){
	var pItem = doc[i].placedItems
	for(var ii = 0, LL = pItem.length; ii < LL; ii++){
		pItem[ii].lock = false;
		pFilePath = pItem[ii].file.toString().replace(/\.jpg|\.psd/,".eps");
	//	pFilePath = pItem[ii].file.toString().replace(/\.psd/,".eps");
		dPath = File.decode(pFilePath)
		// $.writeln(dPath)
		if(new File(dPath)){
			pItem[ii].file = new File(dPath);
			}
		}
	}