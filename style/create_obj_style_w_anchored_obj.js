/**
 * @description アンカー付きオブジェクトだけ設定したオブジェクトスタイルをドキュメントに作る
 * 
 * @param {Object} doc document object
 * @param {String} objStyleName object-style name
 * @example createObjStyl(app.documents[0],"ancho_only");
 */
function createObjStyl (doc, objStyleName) {
	var objStyle;
	try {
		objStyle = doc.objectStyles.add({name:objStyleName});
		}
	catch(e){
		var rep = confirm("already existed object-style named \'"+objStyleName+"\'.\rdo you replace to this?");
		if(rep){
			//問答無用で置換するなら、confirmとif/elseはいらない。下の一行だけでよし
			objStyle = doc.objectStyles.item(objStyleName);
			}
		else {
			alert("replacement was canceled by you");
			exit();
			}
		}
	with(objStyle){
		//アンカー付きオブジェクトを有効にする
		enableAnchoredObjectOptions = true;
		//それ以外を無効にしておく
		enableParagraphStyle = false;
		enableFill = false;
		enableStroke = false;
		enableStrokeAndCornerOptions = false;
		enableTextFrameGeneralOptions = false;
		enableTextFrameBaselineOptions = false;
		enableStoryOptions = false;
		enableTextWrapAndOthers = false;
		enableFrameFittingOptions = false;
		}

	with(objStyle.anchoredObjectSettings){
		anchoredPosition = AnchorPosition.ANCHORED;
			//親の文字からの間隔：カスタム、インライン、行の上
			//ANCHORED //INLINE_POSITION //ABOVE_LINE 

		anchorXoffset = 0;//Xオフセット（カスタム）
		anchorYoffset = 0;//Yオフセット（インライン／カスタム）、後ろスペース（行の上）
		anchorSpaceAbove = 0;//前スペース（行の上）

		lockPosition = false;//手動配置を防ぐ

		pinPosition = false;//段の上下境界線内に収める（カスタム）
		spineRelative = false;//ノド元を基準（カスタム/行の上）

		anchorPoint = AnchorPoint.CENTER_ANCHOR;
			//アンカー付き位置 基準点（カスタム）
			//TOP_CENTER_ANCHOR //TOP_LEFT_ANCHOR //TOP_RIGHT_ANCHOR
			//CENTER_ANCHOR //LEFT_ANCHOR //RIGHT_ANCHOR
			//BOTTOM_CENTER_ANCHOR //BOTTOM_LEFT_ANCHOR //BOTTOM_RIGHT_ANCHOR

		horizontalAlignment = HorizontalAlignment.CENTER_ALIGN;
			//揃え（行の上） ノド元に〜〜はspineRelative = true と併用する
			//CENTER_ALIGN //LEFT_ALIGN //RIGHT_ALIGN //TEXT_ALIGN
			
		verticalAlignment = VerticalAlignment.CENTER_ALIGN;
			//垂直方向の揃え？？？
			//BOTTOM,TOPを設定しても、CENTER_ALIGN 1667591796 になる
			//BOTTOM_ALIGN //CENTER_ALIGN //TOP_ALIGN
			
		horizontalReferencePoint = AnchoredRelativeTo.COLUMN_EDGE;
			//アンカー付き位置 X基準（カスタム）
			//ANCHOR_LOCATION //COLUMN_EDGE //PAGE_EDGE 
			//PAGE_MARGINS //TEXT_FRAME

		verticalReferencePoint = VerticallyRelativeTo.COLUMN_EDGE;
			//アンカー付き位置 Y基準（カスタム）
			//CAPHEIGHT //COLUMN_EDGE
			//LINE_ASCENT //LINE_BASELINE //LINE_XHEIGHT
			//PAGE_EDGE //PAGE_MARGINS 
			//TEXT_FRAME //TOP_OF_LEADING	
	}
}