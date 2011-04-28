/**
選択ガイドの色を変える
"change color of guides"

使い方：
ガイドを選択して実行。ガイドの色を変えます。

動作確認：OS10.4.11 InDesign CS3

milligramme
www.milligramme.cc
*/
if(app.documents.length==0 || app.selection.length==0){
	alert("select any guide");
	exit();
	}

var selObj=app.selection;
if(selObj[0].constructor.name=="Guide"){
	main(selObj);
	}
else{alert("select any guide");}

function main(selObj){
	var UICList=["LIGHT_BLUE", "RED", "GREEN", "BLUE", "YELLOW", 
		"MAGENTA", "CYAN", "GRAY", "BLACK", "ORANGE", "DARK_GREEN", 
		"TEAL", "TAN", "BROWN", "VIOLET", "GOLD", "DARK_BLUE", "PINK", 
		"LAVENDER", "BRICK_RED", "OLIVE_GREEN", "PEACH", "BURGUNDY", 
		"GRASS_GREEN", "OCHRE", "PURPLE", "LIGHT_GRAY", "CHARCOAL", 
		"GRID_BLUE", "GRID_ORANGE", "FIESTA", "LIGHT_OLIVE", "LIPSTICK", 
		"CUTE_TEAL", "SULPHUR", "GRID_GREEN", "WHITE"];
	var dlg=new Window('dialog', 'change!' , [0, 0, 160, 96]);
	dlg.center();
	dlg.ddList=dlg.add('dropdownlist' , [12, 28, 148, 44] , UICList);
	dlg.ddList.selection=6;// CYAN
	dlg.add('statictext' , [12, 10, 148, 27] , 'choose color');
	dlg.cancelButton=dlg.add('button' , [84, 62, 148, 77] , 'cancel' , {name: 'cancel'});
	dlg.okButton=dlg.add('button' , [12, 62, 76, 77] , 'ok' , {name: 'ok'});

	var flag;
	dlg.okButton.onClick=function(){
		flag=true
		dlg.close();
		}	
	dlg.cancelButton.onClick=function(){
		dlg.close();
		}
	dlg.show();

	if(flag==true){
		var col=dlg.ddList.selection.text
		for(var i=0; i < selObj.length; i++){
			selObj[i].guideColor=UIColors[col];
			}
		}
	}