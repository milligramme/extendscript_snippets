#targetengine "session"
main();
function main(){
	var printBf = app.addEventListener("beforePrint", layPrintable, true)
	var printAf = app.addEventListener("afterPrint", layDisPrintable, true)
}

function layPrintable (){
	app.documents[0].layers[0].printable = true;
}

function layDisPrintable (){
	app.documents[0].layers[0].printable = false;
}

