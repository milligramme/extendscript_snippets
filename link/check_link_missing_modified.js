var docObj = app.documents[0];
/*
for(var i=0, iL=docObj.links.length; i < iL; i++){
	var linkSt=docObj.links[i].status;
	switch(linkSt){
		case LinkStatus.NORMAL: ; break;//1852797549 //OK
		case LinkStatus.LINK_EMBEDDED: ; break;//1282237028 //embedded
			//continue process
		case LinkStatus.LINK_MISSING:; break;//1819109747 //missing
		case LinkStatus.LINK_OUT_OF_DATE: alert("need update"); break;//1819242340 //need update
		}
	}

*/
var nkStatus = docObj.links.everyItem().status.toString();
if(nkStatus.indexOf ("1819109747",0) != -1 || nkStatus.indexOf ("1819242340",0) != -1) {
	alert("リンク切れ又は未更新のリンクがあるので中止します。");
}
else{
	psPrint();
}