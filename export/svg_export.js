//InDesignからSVG書き出しいろいろメモ、CS4では非サポート

var doc=app.documents[0];
var sel=app.selection;
with(app.svgExportPreferences){
	pageRange=PageRange.ALL_PAGES;//選択範囲での書き出しの場合無視
	//PageRange.ALL_PAGES もしくは "1-9, 12, 16-18" 形式でページ指定
	
	readersSpreads=false;//見開き
	
	fontSubsetting=FontSubsetting.SUBSET_GLYPHS;//フォントの埋め込み
		//FontSubsetting.NONE なし（システムフォントを使用）
		//FontSubsetting.SUBSET_GLYPHS 使用される文字のみ
		//FontSubsetting.SUBSET_ENGLISH 英数字
		//FontSubsetting.SUBSET_GLYPHS_AND_ENGLISH 英数字や使用される文字
		//FontSubsetting.SUBSET_GLYPHS_AND_ROMAN 英数字と欧文特殊文字
		//FontSubsetting.SUBSET_ENGLISH 英数字、欧文特殊文字と使用される文字
		//FontSubsetting.SUBSET_ENTIRE すべての文字
		
	appliedFlattenerPreset=app.flattenerPresets.itemByID(129);//透明の分割統合プリセット
		//name: [低解像度],[中解像度],[高解像度]
		//id: 128,129,130
		
	ignoreSpreadOverride=true;//スプレッドのオーバーライドを無視

	embedImages=true;//画像埋め込み

	renderingStyle=RenderingStyle.PROGRESSIVE; //レンダリングモード？
		//RenderingStyle.BATCH;  Renders the SVG in batch mode.
		//RenderingStyle.PROGRESSIVE;   Renders the SVG progressively.

	
	styleFormat=StyleFormat.PRESENTATION_ATTRIBUTES; //CSSプロパティ
		//StyleFormat.PRESENTATION_ATTRIBUTES プレゼンテーション属性
		//StyleFormat.CSS スタイル要素
		//StyleFormat.INLINE スタイル属性ファイルサイズ小さく
		//StyleFormat.ENTITY スタイル属性（構成要素参照）
		
	realPrecision=3;//小数点割り付け
		//1-7　大きいほど、画質がよくなり、ファイルサイズが大きくなる
		
	fileEncoding=FileEncoding.UTF8;//エンコーディング
		//FileEncoding.ASCII
		//FileEncoding.UTF8
		//FileEncoding.UTF16
	}

var imgFolder=Folder.selectDialog("choose target folder");
if(imgFolder){
	//doc_export_svg (doc); //ドキュメントページ単位
	if(sel.length !=0){
		//sel_export_svg (sel, doc); //選択オブジェクト全体
		each_sel_export_svg (sel,doc); //選択オブジェクトおのおの
		}
	}

//fn
function doc_export_svg (doc){
	//ドキュメント書き出し	
	fileObj=new File (imgFolder+"/"+doc.name+".svg");
	if(fileObj)
	doc.exportFile(ExportFormat.SVG, fileObj, false);
	}

function sel_export_svg (sel, doc){
	//選択範囲を書き出し
	//選択数 2つ以上の場合は一度複製してグループ化してから書き出し。この処理でよいのか？
	if(sel.length>1){ 
		var s=[];
		for(var i=0; i < sel.length; i++) {s.push(sel[i].duplicate());}
		var g=sel[0].parent.groups.add(s);
		fileObj=new File (imgFolder+"/"+doc.name+new Date().getTime()+".svg");
		if(fileObj){
			g.exportFile(ExportFormat.SVG, fileObj, false)
			g.remove();
			}
		}
	//選択数 1つ
	else if(sel.length==1){	
		fileObj=new File (imgFolder+"/"+doc.name+new Date().getTime()+".svg");
		if(fileObj)
			sel[0].exportFile(ExportFormat.SVG, fileObj, false)
		}
	}

function each_sel_export_svg (sel, doc){
	//選択範囲を個別に書き出し
	for(var i=0; i < sel.length; i++){
		fileObj=new File (imgFolder+"/"+doc.name+new Date().getTime()+".svg");
		if(fileObj){
			try{//不要かもJPEGだと孤立点書き出しでエラーになるので一応...
				sel[i].exportFile(ExportFormat.SVG, fileObj, false);
				}catch(e){}
			}
		}
	}
