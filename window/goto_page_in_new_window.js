//指定ページで新規ウィンドウ
var docObj=app.documents[0];
var dlg=app.dialogs.add({name:"go to page"});
with(dlg){
	with (dialogColumns.add()){
		var pageNo=textEditboxes.add({
			//デフォルト表示は現在のアクティブページ
			editContents: app.windows[0].activePage.appliedSection.name+app.windows[0].activePage.name, 
			minWidht:30
			})
		}
	}
if(dlg.show()==true){
	var goToPage=pageNo.editContents;
	var calcPage=eval(goToPage).toString();
	dlg.destroy();
	//新規ウインドウ
	var nwWin=docObj.windows.add();
	try{//ページに行ってみる
		nwWin.activePage=docObj.pages.item(goToPage);
		}
	catch(e){//ページがなかったら
		try{//計算してみる
			nwWin.activePage=docObj.pages.item(calcPage);
			}
		catch(e){
			nwWin.close();
			alert("The page does not exist.");
			}
		}
	}
else{
	dlg.destroy();
	}
