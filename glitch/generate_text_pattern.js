/**
 * creat textpat 
 * サンプルテキスト機能をつかったランダムテキストパターンの実験
 */

#target "InDesign"

var fon = app.fonts;
var draw_area = 50; //描写領域 50 x 50
var layered = 12; //レイヤー数
var page_len = 40; //ページ数 = パターンの数
var max_range = 36; //max size = min size(9) + max_range あまり大きすぎると描写領域に対してサンプルテキストが割り付けられない

var ma = [ //アプリケーションデフォルトのマージン
	app.marginPreferences.top,
	app.marginPreferences.left,
	app.marginPreferences.bottom,
	app.marginPreferences.right
	];
	
var doc = app.documents.add();
var ddp = doc.documentPreferences;
with(ddp){
	pageWidth = draw_area + ma[1] + ma[3];
	pageHeight = draw_area + ma[0] + ma[2];
	pagesPerDocument = page_len;
	facingPages = false;
}

var c, m, y;
try{
	c = doc.colors.add({
		model:ColorModel.PROCESS, 
		space:ColorSpace.CMYK, 
		colorValue:[100,0,0,0], 
		name:"C"});
}catch(e){c = doc.swatches.item('C');}
try{
	m = doc.colors.add({
		model:ColorModel.PROCESS, 
		space:ColorSpace.CMYK, 
		colorValue:[0,100,0,0], 
		name:"M"});
}catch(e){m = doc.swatches.item('C');}
try{
	y = doc.colors.add({
		model:ColorModel.PROCESS, 
		space:ColorSpace.CMYK, 
		colorValue:[0,0,100,0], 
		name:"Y"});
}catch(e){y = doc.swatches.item('C');}
var cmy = [c, m, y];

var tfBon = [ //マージン内にテキストフレームをつくる
	ma[0],
	ma[1],
	ma[0] + draw_area,
	ma[1] + draw_area
	];

for(var j=0; j < page_len; j++){
	for (var i=0; i < layered; i++) {
		var tf = doc.pages[j].textFrames.add({geometricBounds: tfBon });
		with(tf.parentStory){
			pointSize = 9 + ( max_range * Math.random() ) + "pt"; //(9 ~ 81 pt)
			leading = tf.parentStory.pointSize;
			
			try{
				appliedFont = fon[Math.floor(fon.length * Math.random())]
			}catch(e){}

			//line
			// strokeWeight = "0.3 pt";
			// strokeColor = cmy[Math.floor(cmy.length * 10 * Math.random() / 10)];
			// fillColor = "None";

			//fill
			strokeColor = "None";
			fillColor = cmy[Math.floor(cmy.length * Math.random() )];
		}
		//set dummy text
		tf.contents = TextFrameContents.placeholderText;//1346925688; 
		tf.transparencySettings.blendingSettings.blendMode = BlendMode.MULTIPLY;
		tf.transparencySettings.blendingSettings.opacity = 25;
	}
};
//デスクトップにフォルダを作成してその中に、InDesignドキュメントの各ページをjpeg書出し
exportJepgEachPage (doc);
//書き出したjpegをアンカー付きオブジェクトにして取り込み
placeAnchordImageToDoc (imgFolder);

function exportJepgEachPage (doc) {
	with(app.jpegExportPreferences){
		jpegExportRange = ExportRangeOrAllPages.EXPORT_ALL;
		jpegQuality = JPEGOptionsQuality.MAXIMUM;
		jpegRenderingStyle = JPEGOptionsFormat.BASELINE_ENCODING;
		resolution = 150;
		exportingSpread = false;
		}
	imgFolder = new Folder("~/Desktop/" + new Date().getTime());
	imgFolder.create();
	if(imgFolder){
		fileObj = new File (imgFolder + "/a" + ".jpg");//なにかprefixがないとdot fileの .jpgが生成されてしまう
		if(fileObj){
			doc.exportFile(ExportFormat.JPG, fileObj, false);
		}
	}
}

// doc.close(SaveOptions.NO);
function placeAnchordImageToDoc (impSrc) {
	var doc2 = app.documents.add();
	var tf2 = doc2.textFrames.add();
	var impSrc = imgFolder;
	var impSrc_fs = new File(impSrc).fsName;
	var impSrc_list = File(impSrc_fs).getFiles(
		function (file){ return /^[^\.]+\.jpg$/i.test(file.name)}
		);
	if(impSrc)
	for (var i=0; i < impSrc_list.length; i++) {
		var ob = tf2.parentStory.insertionPoints[-1].rectangles.add();
		tf2.parentStory.insertionPoints[-1].contents = "\n";
		ob.place(impSrc_list[i]);
		ob.anchoredObjectSettings.anchoredPosition = AnchorPosition.ANCHORED;
		ob.fit(FitOptions.FRAME_TO_CONTENT);
	};

}


