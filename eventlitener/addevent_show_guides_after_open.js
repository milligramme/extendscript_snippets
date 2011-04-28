#targetengine "session"
main();
function main(){
	var afOp = app.addEventListener("afterOpen", showGuidesAndFrame, false);
	}

function showGuidesAndFrame (myEvent){
	var doc = myEvent.parent;
	with(doc){
		guidePreferences.guidesShown   = true; //ガイド表示
		viewPreferences.showFrameEdges = true; //フレーム枠表示
		viewPreferences.showRulers     = true; //ルーラー表示
		textPreferences.showInvisibles = true; //制御文字表示
		}
	}


