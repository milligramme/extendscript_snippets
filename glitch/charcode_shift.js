//選択部分の文字コードをずらす。（改行は除く）

//パラメーター：文字コードのずらし量を設定
var n= 1;

if(app.documents.length > 0 && app.selection.length > 0){
	main(n);
	}

function main (n){
	var selObj=app.selection[0];
	switch(selObj.constructor.name){
		case "Character":
		case "Word":
		case "TextStyleRange":
		case "Line":
		case "Text":
		case "Paragraph": 
		case "TextColumn": shiftCharCode (selObj, n); break;
		case "Table":
		case "Cell": shiftEachTable (selObj, n); break;
		}
	}
	
function shiftCharCode (selObj, n){
	var convArr=new Array();
	for(var i=0, L=selObj.contents.length; i < L; i++){
		//改行は除外
		if(selObj.contents.charCodeAt (i)!=13){
			var charConv=(selObj.contents.charCodeAt (i)+n).toString(16);
			var convChar=String.fromCharCode(parseInt("0x"+charConv));
			//$.writeln(convChar);
			convArr.push(convChar);
			}
		else{convArr.push(selObj.contents.charAt(i));}
		}
	selObj.contents=convArr.toString().replace(/\,/g,"");
	}


function shiftEachTable(selObj, n){
	var cellObj=selObj.cells;
	for(var ii=0, LL=cellObj.length; ii < LL; ii++){
		shiftCharCode (cellObj[ii].texts[0], n);
		}
	}