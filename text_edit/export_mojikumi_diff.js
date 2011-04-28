/*
文字組アキ量設定の差分を書出し
"what is the difference between my settings and default settings"
使い方：
オリジナル文字組アキ量設定があるInDesign書類を開いて実行。
オリジナル文字組アキ量設定とベースとするデフォルトをドロップダウンメニューから選択
設定のオーバーライドした内容をデスクトップに書出します。
動作確認：OS10.4.11 InDesign CS3, OS10.6.4 InDesign CS3, CS4
milligramme
www.milligramme.cc
*/
if(app.documents.length > 0){
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
	main();
}

function main () {	
	var defSet = parseInt(app.version) < 6 ? 14 : 16;//cs3の場合14、cs4の場合は16
	
	var everyMJKM = app.documents[0].mojikumiTables.everyItem().name;
	var myMJKM_list = everyMJKM.slice(defSet, everyMJKM.length);//デフォルト以外を除去
	var def_mojikumi_list = [
		"なし", // 0	1851876449
		"行末約物半角", // 1	1246572593
		"行末受け約物半角・段落 1 字下げ (起こし全角)", // 2	1246572594
		"行末受け約物半角・段落 1 字下げ (起こし食い込み)", // 3	1246572595
		"約物全角・段落 1 字下げ", // 4	1246572596
		"約物全角・段落 1 字下げ (起こし全角)", // 5	1246572597
		"行末約物全角 / 半角・段落 1 字下げ", // 6	1246572598
		"行末受け約物全角 / 半角・段落 1 字下げ (起こし全角)", // 7	1246572599
		"行末受け約物全角 / 半角・段落 1 字下げ (起こし食い込み)", // 8	1246572600
		"行末約物半角・段落 1 字下げ", // 9	1246572601
		"約物全角", // 10	1246572848
		"行末受け約物全角 / 半角", // 11	1246572849
		"行末句点全角・段落 1 字下げ", // 12	1246572850
		"行末句点全角・段落 1 字下げ (起こし全角)", // 13	1246572851
		"行末句点全角" // 14	1246572852
		];
	if (defSet === 16) {
		def_mojikumi_list.push(
			"繁体中国語 (標準)", // 15 1246572854
			"簡体中国語 (標準)" // 16	1246572853
			);
	}
	var mojikumi_list_hash = {
		1851876449: "なし", //0
		1246572593: "行末約物半角", //1
		1246572594: "行末受け約物半角・段落 1 字下げ (起こし全角)", // 2	
		1246572595: "行末受け約物半角・段落 1 字下げ (起こし食い込み)", // 3	
		1246572596: "約物全角・段落 1 字下げ", // 4	
		1246572597: "約物全角・段落 1 字下げ (起こし全角)", // 5	
		1246572598: "行末約物全角 / 半角・段落 1 字下げ", // 6	
		1246572599: "行末受け約物全角 / 半角・段落 1 字下げ (起こし全角)", // 7	
		1246572600: "行末受け約物全角 / 半角・段落 1 字下げ (起こし食い込み)", // 8	
		1246572601: "行末約物半角・段落 1 字下げ", // 9	
		1246572848: "約物全角", // 10	
		1246572849: "行末受け約物全角 / 半角", // 11	
		1246572850: "行末句点全角・段落 1 字下げ", // 12	
		1246572851: "行末句点全角・段落 1 字下げ (起こし全角)", // 13	
		1246572852: "行末句点全角", // 14
		1246572854: "繁体中国語 (標準)", // 15 
		1246572853: "簡体中国語 (標準)" // 16	
		}


	var dialogObj = app.dialogs.add({
		name:"export Mojikumi Table overrided Aki Setting", canCancel:true
		});
	with(dialogObj){		
		with(dialogColumns.add()){
			with(borderPanels.add()){//dropdown
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "myMojikumi Aki Setting"});
				}
				with(dialogColumns.add){
					var checkMJKM_Menu = dropdowns.add({
						stringList: myMJKM_list, selectedIndex: 0
						});
				}
			}//dropdown check my mojikumi
			with(borderPanels.add()){//dropdown
				with(dialogColumns.add()){
					staticTexts.add({staticLabel: "basedOnDefault"});
				}
				with(dialogColumns.add){
					var basedonMJKM_Menu = dropdowns.add({
						stringList: def_mojikumi_list, selectedIndex: 0
						});
				}
			}//dropdown basedon
		}
	}
	if(dialogObj.show() == true){
		var checkMJKM, basedonMJKM;
		checkMJKM = app.documents[0].mojikumiTables[defSet+checkMJKM_Menu.selectedIndex];
		switch(basedonMJKM_Menu.selectedIndex){
			case 0: basedonMJKM = 1851876449; break;
			case 1: basedonMJKM = 1246572593; break;
			case 2: basedonMJKM = 1246572594; break;
			case 3: basedonMJKM = 1246572595; break;
			case 4: basedonMJKM = 1246572596; break;
			case 5: basedonMJKM = 1246572597; break;
			case 6: basedonMJKM = 1246572598; break;
			case 7: basedonMJKM = 1246572599; break;
			case 8: basedonMJKM = 1246572600; break;
			case 9: basedonMJKM = 1246572601; break;
			case 10: basedonMJKM = 1246572848; break;
			case 11: basedonMJKM = 1246572849; break;
			case 12: basedonMJKM = 1246572850; break;
			case 13: basedonMJKM = 1246572851; break;
			case 14: basedonMJKM = 1246572852; break;
			case 15: basedonMJKM = 1246572854; break;
			case 16: basedonMJKM = 1246572853; break;
		}
		dialogObj.destroy();
		}
	else{
		dialogObj.destroy();
		exit();
	}

	var myMJKM = checkMJKM;
	myMJKM.basedOnMojikumiSet = basedonMJKM;
	var mjkmTex = myMJKM.overrideMojikumiAkiList;
	//ex [1,12,false,0,0,0.125,3,false]
	var mjkmBefore;// 1番目
	var mjkmAfter;//2番目
	var endRange;//8番目
	var fileObj = new File("~/desktop/mojikumi_parameter_text.txt");
	var flag = fileObj.open("w");
	if(flag  ==  true){
		fileObj.writeln(checkMJKM.name.toString());
		fileObj.writeln("ベースの設定は 「" + mojikumi_list_hash[myMJKM.basedOnMojikumiSet]+ "」 です");
		fileObj.writeln(myMJKM.overrideMojikumiAkiList.length + "項目のオーバーライドがあります\n");
		for(var ln = 0; ln < myMJKM.overrideMojikumiAkiList.length; ln++){
			//文字クラス対応
			switch(mjkmTex[ln][0]){
				case 1 : mjkmBefore = "その他の始め括弧"; break;
				case 2 : mjkmBefore = "その他の終わり括弧"; break;
				case 3 : mjkmBefore = "行頭禁則和字"; break;
				case 4 : mjkmBefore = "区切り約物"; break;
				case 5 : mjkmBefore = "中黒"; break;
				case 6 : mjkmBefore = "句点"; break;
				case 7 : mjkmBefore = "分離禁止文字"; break;
				case 8 : mjkmBefore = "前置省略記号"; break;
				case 9 : mjkmBefore = "後置省略記号"; break;
				case 10 : mjkmBefore = "和字間隔"; break;
				case 11 : mjkmBefore = "平仮名"; break;
				case 12 : mjkmBefore = "上記以外の和字"; break;
				case 18 : mjkmBefore = "欧文"; break;
				case 21 : mjkmBefore = "読点"; break;
				case 22 : mjkmBefore = "行頭/行末"; break;
				case 23 : mjkmBefore = "段落先頭"; break;
				case 24 : mjkmBefore = "全角数字"; break;
				case 25 : mjkmBefore = "半角数字"; break;
				case 26 : mjkmBefore = "始めかぎ括弧"; break;
				case 27 : mjkmBefore = "始め丸括弧"; break;
				case 28 : mjkmBefore = "終わりかぎ括弧"; break;
				case 29 : mjkmBefore = "終わり丸括弧"; break;
				case 30 : mjkmBefore = "コンマ類"; break;
				case 31 : mjkmBefore = "ピリオド類"; break;
				case 32 : mjkmBefore = "コロン類"; break;
				case 33 : mjkmBefore = "カタカナ"; break;
				default: mjkmBefore = "????"; break;
			}
			switch(mjkmTex[ln][1]){
				case 1 : mjkmAfter = "その他の始め括弧"; break;
				case 2 : mjkmAfter = "その他の終わり括弧"; break;
				case 3 : mjkmAfter = "行頭禁則和字"; break;
				case 4 : mjkmAfter = "区切り約物"; break;
				case 5 : mjkmAfter = "中黒"; break;
				case 6 : mjkmAfter = "句点"; break;
				case 7 : mjkmAfter = "分離禁止文字"; break;
				case 8 : mjkmAfter = "前置省略記号"; break;
				case 9 : mjkmAfter = "後置省略記号"; break;
				case 10 : mjkmAfter = "和字間隔"; break;
				case 11 : mjkmAfter = "平仮名"; break;
				case 12 : mjkmAfter = "上記以外の和字"; break;
				case 18 : mjkmAfter = "欧文"; break;
				case 21 : mjkmAfter = "読点"; break;
				case 22 : mjkmAfter = "行頭/行末"; break;
				case 23 : mjkmAfter = "段落先頭"; break;
				case 24 : mjkmAfter = "全角数字"; break;
				case 25 : mjkmAfter = "半角数字"; break;
				case 26 : mjkmAfter = "始めかぎ括弧"; break;
				case 27 : mjkmAfter = "始め丸括弧"; break;
				case 28 : mjkmAfter = "終わりかぎ括弧"; break;
				case 29 : mjkmAfter = "終わり丸括弧"; break;ss
				case 30 : mjkmAfter = "コンマ類"; break;
				case 31 : mjkmAfter = "ピリオド類"; break;
				case 32 : mjkmAfter = "コロン類"; break;
				case 33 : mjkmAfter = "カタカナ"; break;
				default: mjkmAfter = "????"; break;
			}
			//文字クラスNo22の取扱い、3番目の引数で変化
			if(mjkmTex[ln][2] == false && mjkmTex[ln][0] == 22){
				mjkmBefore = "行頭";
			}
			if(mjkmTex[ln][2] == true && mjkmTex[ln][0] == 22){
				mjkmBefore = "行末";
			}
			if(mjkmTex[ln][2] == false && mjkmTex[ln][1] == 22){
				mjkmAfter = "行頭";
			}
			if(mjkmTex[ln][2] == true && mjkmTex[ln][1] == 22){
				mjkmAfter = "行末";
			}
			//行末の取扱い、8個目の引数で変化
			if(mjkmTex[ln][7] == false){
				endRange = "〜";
			}
			else{
				endRange = "／";
			}
			//$.writeln(mjkmTex[ln]);//javascriptコンソールにかきだし
			//3番目の引数で前クラス・後クラスの順番が変化
			if(mjkmTex[ln][2] == true){
				fileObj.writeln(mjkmBefore + " > > " + mjkmAfter + "_優先度:" + mjkmTex[ln][6] + "_最適値:" + mjkmTex[ln][4] * 100 + "%_最小最大値" + mjkmTex[ln][3] * 100 + endRange + mjkmTex[ln][5] * 100 + "%");
			}
			else{
				fileObj.writeln(mjkmAfter + " > > " + mjkmBefore + "_優先度:" + mjkmTex[ln][6] + "_最適値:" + mjkmTex[ln][4] * 100 + "%_最小最大値:" + mjkmTex[ln][3] * 100 + endRange + mjkmTex[ln][5] * 100 + "%");
			}
		}
		fileObj.close();
	}
	else{
		alert("cant open file");
	}
}

