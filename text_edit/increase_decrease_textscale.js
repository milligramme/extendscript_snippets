//選択部分のバラバラな長体率や平体率を個別に増減
var n=-1;
if(app.documents.length > 0 && app.selection.length > 0){
	main(n);
	}

function main (n){
	var selObj=app.selection;
	for( var j=0; j < selObj.length; j++){
		switch(selObj[j].constructor.name){
			case "Character":
			case "Word":
			case "TextStyleRange":
			case "Line":
			case "Text":
			case "Paragraph": 
			case "TextColumn":
			case "TextFrame": increaseEach (selObj[j], n); break;
			case "Table":
			case "Cell": increaseEachTable (selObj[j], n); break;
			//default : 
			}
		}
	}

function increaseEach (selObj, n, hv){
	if(hv==undefined){
		var HorV=selObj.parentStory.storyPreferences.storyOrientation==HorizontalOrVertical.HORIZONTAL ? 'horizontalScale':'verticalScale';
		}else{HorV=hv;}
	//var colorLoop=["Cyan", "Magenta","Yellow"];// Text Style Rangeごとに3色をループ
	var txSRange=selObj.textStyleRanges;
	for(i=0, L=txSRange.length; i < L; i++){
		//txSRange[i].fillColor=app.documents[0].colors.item(colorLoop[i%3]); // Text Style Rangeごとに3色をループ
		txSRange[i][HorV]+=n;
		}
	}

function increaseEachTable(selObj, n){
	var cellObj=selObj.cells;
	for(var ii=0, LL=cellObj.length; ii < LL; ii++){
		var HorV=cellObj[ii].writingDirection==HorizontalOrVertical.HORIZONTAL ? 'horizontalScale':'verticalScale';
		increaseEach (cellObj[ii].texts[0], n, HorV);
		}
	}