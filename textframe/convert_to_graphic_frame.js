// convert_to_graphicframe(app.selection, true);
convert_to_graphicframe(app.selection, false);

function convert_to_graphicframe(sel, forceDel){
	for(var i=0; i < sel.length; i++){
		switch(sel[i].constructor.name){
			case "InsertionPoint": 
				target = sel[i].parentTextFrames[0]; break;
			case "TextFrame":
			case "Rectangle": 
				target = sel[i]; break;
			default : ; break;
			}
		
		// $.writeln(sel[i])
		if(target.contentType == ContentType.TEXT_TYPE){
			try{
				target.contentType = ContentType.GRAPHIC_TYPE;
				}
			catch(e){
				if(forceDel == true){
					target.texts[0].contents = "";
					target.contentType = ContentType.GRAPHIC_TYPE;
					}
				else{
					deltex = confirm("\""+target.texts[0].contents+"\" 文字情報がありますが消してよいか？",true)
					if(deltex == true){
						target.texts[0].contents = "";
						target.contentType = ContentType.GRAPHIC_TYPE;
						}
					}
				}
			}
		}
	}