#target "Photoshop"
//pdfを希望解像度で拡大縮小してepsとかpsdとかの画像にするスクリプト
//
//実行すると、変換するPDFフォルダ、書き出し先フォルダをきいてくるので
//選択、パラメーターの書き換えでEPS、PSD、拡大縮小率、解像度を指定します。

//パラメーター
var finalResolutionSetting = 400; //最終的に希望する解像度
var devideWithPer          = 0.25; //希望する拡大縮小率
var saveAsEPS              = false; //trueならEPS, falseならばPSD

//pdfがある対象フォルダを選択
var targetFolder = Folder.selectDialog ("select target folder");
if(targetFolder != null){
	//書き出し先のフォルダを選択
	var exportFolder = Folder.selectDialog ("select export folder");
	if(exportFolder != null){
		setPref(); //設定Fnへ
		if(saveAsEPS == true){ //EPS書き出しFnへ
			convertPDF2EPS(targetFolder, exportFolder, pdfOpenOpt, epsSaveOpt);
		}
		else{ //PSD書き出しFnへ
			convertPDF2PSD(targetFolder, exportFolder, pdfOpenOpt, psdSaveOpt);
		}
	}
}

//PDF、EPS、PSDの入出力の設定をする
function setPref (){
	pdfOpenOpt = new PDFOpenOptions();
	with(pdfOpenOpt){
		antiAlias              = true;
		cropPage               = CropToType.MEDIABOX;
		//Deprecated for Adobe Photoshop CS3 / 非推奨で反映されないプロパティ
		//constrainProportions = ;
		//width                = ;
		//height               = ; 
		resolution             = finalResolutionSetting * devideWithPer;
		mode                   = OpenDocumentMode.CMYK;
		bitPerChannel          = BitsPerChannelType.EIGHT;
		page                   = 1;
		suppressWargings       = true; //警告を非表示
		usePageNumber          = true; //falseならば画像の番号になる。
		}

	epsSaveOpt = new EPSSaveOptions();
	with(epsSaveOpt){
		embedColorProfile = true;
		encoding          = SaveEncoding.JPEGMAXIMUM;
		halftoneScreen    = false;
		interpolation     = false;
		preview           = Preview.EIGHTBITTIFF; //DOM Libraryのうそつき(MacPreviewType)?
		psColorManagement = false;
		transferFunction  = false;
		transparentWhites = false;
		vectorData        = false;
	}
	
	psdSaveOpt = new PhotoshopSaveOptions();
	with(psdSaveOpt){
		alphaChannels     = true;
		annotations       = true;
		embedColorProfile = false;
		layers            = false;
		spotColors        = false;
	}
return pdfOpenOpt, epsSaveOpt, psdSaveOpt
}

//EPSにする
function convertPDF2EPS(targetFolder, exportFolder, pdfOpenOpt, epsSaveOpt){
	var pdfPath = new File(targetFolder).fsName;
	var pdfFileList = File(pdfPath).getFiles(
		function (file){
			return /^[^\.]+\.pdf$/i.test(file.name)
			});
	for(var i=0, L=pdfFileList.length; i < L; i++){
		app.open(pdfFileList[i], pdfOpenOpt);
		var fileObj = new File(exportFolder+"/"+pdfFileList[i].name.replace(/\.pdf/,".eps"));
		activeDocument.resizeImage (undefined, undefined, finalResolutionSetting, ResampleMethod.NONE);
		activeDocument.saveAs(fileObj, epsSaveOpt, true, Extension.LOWERCASE);
		activeDocument.close(SaveOptions.DONOTSAVECHANGES); //DOM Libraryのうそつき(SaveOptionsType)?
	}
}

//PSDにする
function convertPDF2PSD(targetFolder, exportFolder, pdfOpenOpt, psdSaveOpt){
	pdfPath = new File(targetFolder).fsName;
	pdfFileList = File(pdfPath).getFiles(
		function (file){
			return /^[^\.]+\.pdf$/i.test(file.name)
			});
	for(var i=0, L=pdfFileList.length; i < L; i++){
		app.open(pdfFileList[i], pdfOpenOpt);
		var fileObj = new File(exportFolder+"/"+pdfFileList[i].name.replace(/\.pdf/,".psd"));
		activeDocument.resizeImage (undefined, undefined, finalResolutionSetting, ResampleMethod.NONE);
		activeDocument.flatten(); //画像を統合
		activeDocument.saveAs(fileObj, psdSaveOpt, true, Extension.LOWERCASE);
		activeDocument.close(SaveOptions.DONOTSAVECHANGES); //DOM Libraryのうそつき(SaveOptionsType)?
	}
}
