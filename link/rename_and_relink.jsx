/**
 *  Rename and Relink
 * "選択した配置画像のファイル名をリネームして再リンク"
 * ■他にもリネーム前の同名のファイルがある場合同階層であれば、それらもまとめて再リンク。ただし同名でも階層が違う（リンク切れをしない）場合はそのまま
 * ■リネームしたいファイル名が既に存在する場合そのファイルにリンクを変更（置換）するか、処理をキャンセルするかを選択してから処理
 */

(function() {
  if (app.documents.length == 0) return;
  var sel = app.selection;
  if (sel.length == 1){
  	//選択しているものの判別
  	switch (sel[0].constructor.name){
  		case "Rectangle":
  		case "Oval":
  		case "Polygon":
    		if (sel[0].allGraphics.length != 0){
    			rename_and_relink(sel[0].allGraphics[0]);
  			};
  			break;
  		case "Image":
  		case "EPS":
  		case "PDF":
  		case "PICT":
  		case "ImportedPage":
  			rename_and_relink(sel[0]);
  			break;
  		case "Group":
  			alert("グループ化されてます。\rグループ解除して一つだけ選択、または、ダイレクト選択してください");
  			return;
		}
	}

  // 
  function rename_and_relink(sel){
  	//現在の配置画像のファイルパスとファイル名
  	var current_link      = sel.itemLink;
  	var current_file_name = current_link.name;
  	var current_link_file = File(current_link.filePath);
  	//ダイアログにてリネームする
  	var new_file_name = prompt ("rename", current_file_name, "RenameTo");
  	//キャンセル押したときはリネームしない
  	if(new_file_name == null) return;
  	var new_link_file = current_link_file.rename(new_file_name);
  	if(new_link_file == true){
  		current_link.relink(current_link_file);
  		current_link.update();
  	}
  	else {
  		//リネームしたいファイル名のファイルが存在している
  		//リネームせずに終了
  		var replace_check = confirm("そのファイル名は既に存在しています。\r「はい/YES」ならそのファイルに置換、「いいえ/NO」なら処理をキャンセルします");
  		//既に存在しているファイル名に
  		if(replace_check == true){
  			var existLinkFilePath = current_link.filePath.replace(current_file_name,new_file_name);
  			var existLinkFile = File(existLinkFilePath);
  			current_link.relink(existLinkFile);
  			current_link.update();
  		}
  	}
  	//リンク情報全体を取得、ほかに同名ファイルがあるかどうか調べる。
  	var all_links = app.documents[0].links;
  	for(var i = all_links.length-1; i >= 0; i--){
  		if(all_links[i].name == current_file_name){
  			var other_link = all_links[i].parent.itemLink;
  			//リンクが切れたらファイル名を置換、切れなかったらそれは無視=別階層
  			if(all_links[i].status == LinkStatus.LINK_MISSING){
  				other_link.relink(current_link_file);
  				other_link.update();
  			}
  		}
  	}
  }
})();


/**
 * @param {Object} sel selected Graphic Object
 */


