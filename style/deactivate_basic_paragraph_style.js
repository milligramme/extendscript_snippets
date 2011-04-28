//ドキュメント上の基本段落ベースの段落を
//「スタイルとのリンクを切断」して［段落スタイルなし］の
//オーバーライド状態にします。
//
//段落スタイルで［基本段落］をベースにしているものがあれば
//「段落スタイルなし」ベースに変更します。

var doc=app.documents[0];
var storyObj=doc.stories;
//段落スタイルを処理
replaceBasedOnBasicParagraphStyle()
//ストーリーと表を処理
for(var i=0, L=storyObj.length; i < L; i++){
	replaceToNoParaStyle (storyObj[i], doc);
	
	var tableObj=storyObj[i].tables;
	for(var ii=0, LL=tableObj.length; ii < LL; ii++){
		replaceToNoParaStyleTable (tableObj[ii], doc)
		}
	}

//Function様たち
//Paragraph ごとに［基本段落］を使っていないか調べる。
function replaceToNoParaStyle (target, doc){
	var txstrgObj=target.paragraphs;
	for(var itx=0, Ltx=txstrgObj.length; itx < Ltx; itx++){
		if(txstrgObj[itx].appliedParagraphStyle.name=="[基本段落]"){
			//appliedParagraphStyleだとオーバーライドを保持できないので
			//applyParagraphStyle()メソッドをオプションfalseで使う
			txstrgObj[itx].applyParagraphStyle (doc.paragraphStyles.item("[段落スタイルなし]"), false);
			}
		}
	}

//表の中での捜索、入れ子の表も捜索。
function replaceToNoParaStyleTable (table, doc){
	var existTable=new Array();
	for(var iCe=0, LCe=table.cells.length; iCe < LCe; iCe++){
		replaceToNoParaStyle (table.cells[iCe], doc);
		if(table.cells[iCe].tables.length !=0){//入れ子の表をチェック
			existTable.push(iCe);//セル位置を覚えておく
			}
		}
	for(var iExTb=0, LexTb=existTable.length; iExTb < LexTb; iExTb++){ 
		var inTable=table.cells[existTable[iExTb]].tables; //入れ子の表があるセルの表
		for(var inTb=0, LinTb=inTable.length; inTb < LinTb; inTb++){
			replaceToNoParaStyleTable (inTable[inTb], doc);
			}
		}
	}

// 段落スタイルをチェック
//［基本段落］ベースの段落スタイルを［段落スタイルなし］ベースにリセット
function replaceBasedOnBasicParagraphStyle(){
	var paraStyle=doc.paragraphStyles;
	for(var j=0, K=paraStyle.length; j < K; j++){
		if(paraStyle[j].name !="[段落スタイルなし]"){
			if(paraStyle[j].basedOn==doc.paragraphStyles.item("[基本段落]")){
				paraStyle[j].basedOn=doc.paragraphStyles.item("[段落スタイルなし]");
				}
			}
		}
	}

