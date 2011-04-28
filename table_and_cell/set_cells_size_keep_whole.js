/**
表全体幅を維持して、選択セル幅を足したり引いたり
"increase / decrease cell width with keep table width"

使い方：
表選択範囲の中でマスターとスレイブのセルを設定し増減値を決めて実行。
マスターで足した値を、スレイブで引きます。

実行条件：
表またはセルを選択している
選択範囲内に結合セルを含まないこと
1行のみ選択していること

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0 || app.selection.length==0){exit();}

var docObj=app.documents[0];
var selObj=app.selection[0];
switch(selObj.constructor.name){
	case "Table":
	case "Cell":
		if(selObj.rows.length==1){
			dlg(selObj);
			}
		else{
			alert("select only one rows");
			exit();
			}
		break;
	default :// TableとCell以外は無視
		alert("select Tables or Cells");
		break;
	}
		
function dlg(selObj){
	var cellObj=selObj.cells;

	var Dlg=app.dialogs.add({name:"cell width adjuster", canCancel: true});
	with(Dlg){
		with(dialogColumns.add()){
			with(borderPanels.add()){
				staticTexts.add({staticLabel: "incremental / decremental value "});
				var adjustVal=realEditboxes.add({
					editValue: 0, //増減値の初期値
					largeNudge: 0.5, //シフト押しながらの↑↓カーソルキーでの増減
					smallNudge: 0.1 //↑↓カーソルキーでの増減
					});
				}// with borderpanel 1
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"MasterCell"})
				var masterCell=integerEditboxes.add({
					editValue: 1, 
					minimumValu: 1, 
					maximumValue: cellObj.length, 
					smallNudge: 1
					});
				staticTexts.add({staticLabel:"SlaveCell"})
				var slaveCell=integerEditboxes.add({
					editValue: Math.min(2, cellObj.length), 
					minimumValu: 1, 
					maximumValue: cellObj.length, 
					smallNudge: 1
					});
				}// with borderpanel 2
			}// with dialogcolumn
		}// with Dlg

	if(Dlg.show()==true){
		var val=adjustVal.editValue;
		var master=masterCell.editValue;
		var slave=slaveCell.editValue;
		adjustCellWidth(cellObj, val, master, slave);
		Dlg.destroy();
		}
	else{
		Dlg.destroy();
		exit();
		}
	}
function adjustCellWidth(cellObj, val, master, slave){
	//ここがご本尊
	//セルが結合してないかチェック
	var mergeChecker=new Array();
	for(var i=0; i < cellObj.length; i++){
		mergeChecker.push(1);
		}
	if(cellObj.everyItem().columnSpan==mergeChecker.toString()){
		//小さくなりすぎた時のための予防
		masterBk=cellObj[master-1].width;
		slaveBk=cellObj[slave-1].width;
		try{
			cellObj[master-1].width+=val;
			}
		catch(e){
			cellObj[master-1].width=masterBk;
			alert("master cell width can not be decreased");
			exit();
			}
		try{
			cellObj[slave-1].width-=val;
			}
		catch(e){
			cellObj[master-1].width=masterBk;
			cellObj[slave-1].width=slaveBk;
			alert("slave cell width can not be decreased");
			}
		}
	else{alert("select unmerged cells");}
	}//function


