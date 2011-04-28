//選択した表の本文行にデータ流し込み
//表全体か一部を選択して実行

//列が足りなければログに書き出し
//行が足りなければセルを追加

//var st=new Date().getTime();
if(app.documents.length > 0 && app.selection.length = 1)
(function(){
var selObj=app.selection[0];//tableを選択
var tableObj;
switch(selObj.constructor.name){
	case "Table": tableObj=selObj ; break;
	case "Cell" : tableObj=selObj.parent; break;
	default : 
		alert("please select any cell of table to place the data");
		exit();//セルやテーブル以外では抜ける
		break;
	}
	//本文行、ヘッダ行、フッダ行
	var rowObj=tableObj.rows;
	var hRowLength=tableObj.headerRowCount;
	var bRowLength=tableObj.bodyRowCount;
	
	//タブ区切りテキストを選択して読み込む、二次配列にする
	var filePath= File.openDialog("please select tab separated text");
	if(filePath){
		var fileObj=new File(filePath);
		var flg=fileObj.open("r");
		if(flg){
			var impoLine=new Array();	
			while(!fileObj.eof){
				impoLine.push(fileObj.readln().split("\t"));
				}
				fileObj.close();
			}
		}
	//読み込んだソースと表の本文行の数を比較して行数を調整する
	var n=impoLine.length-bRowLength;
	tableObj.bodyRowCount=bRowLength+n;
	//オーバーフロー箇所の書き出しのための配列
	var elog=new Array();
	for(var r=0, rL=tableObj.bodyRowCount; r < rL; r++){
		for(var c=0, cL=rowObj[r].cells.length; c < cL; c++){
			//読み込んだソースをタブで分割して各セルに配置
			try{rowObj[r+hRowLength].cells[c].texts[0].contents= impoLine[r][c];}
			catch(e){rowObj[r+hRowLength].cells[c].texts[0].contents="";}
			}
		}
	for(var r=0, rL=tableObj.bodyRowCount; r < rL; r++){
		//表の列がソースよりも足りない場合オーバーフローした箇所を書き出す
		var spn=impoLine[r].length;
		if(rowObj[r+hRowLength].cells.length < spn){
			elog.push("line:" +(r+1)+"\t"+" OV= " +impoLine[r].splice(rowObj[r].cells.length, spn)+" \r" );
			}
		}
	//$.writeln(" elog="+elog.length);
	//オーバーフロー内容を書き出し
	if(elog.length > 0){
		var logFileObj= new File("~/Desktop/overflow"+new Date().getTime().toString()+".txt");
		if(logFileObj){
			logFlg=logFileObj.open("w");
			if(logFlg){
				logFileObj.write(elog.toString());
				logFileObj.close()
				alert("there has been overflowing lines \r logfile =>"+logFileObj);
				}
			}
		}
})();

//var en=new Date().getTime();
//$.writeln((en-st)/1000+"sec");
