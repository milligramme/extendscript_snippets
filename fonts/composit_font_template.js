var doc = app.documents[0];
//合成フォントを追加する
var cFont = doc.compositeFonts.add();
//なまえはつけないと「合成フォント1...」と連番が付いていく
cFont.name = ""+new Date().getTime();

//合成フォントの要素を追加、デフォルトで0〜5が自動作成済み？
var cFontEnt = cFont.compositeFontEntries;
//合成フォントの要素
//==＞ 0.漢字 ,1.かな ,2.全角約物 ,3.全角記号 ,4.半角欧文 ,5.半角数字

//各要素の設定変更
//漢字
with(cFontEnt[0]){
	appliedFont     = "A-OTF UD新ゴNT Pro"; //ネイティブなフォント名（和名）、ポストスクリプト名だとダメ
	fontStyle       = "L"; //スタイル
	relativeSize    = 100; //サイズ（漢字・全角約物・全角記号に対しての相対サイズ）
	baselineShift   = 5; //ベースラインシフト
	verticalScale   = 100; //垂直比率：1から1000まで
	horizontalScale = 100; //水平比率：1から1000まで	
}

//かな
with(cFontEnt[1]){
	appliedFont     = "A-OTF 武蔵野草かな Std";
	fontStyle       = "Regular";
	relativeSize    = 120;
	baselineShift   = 0;
	verticalScale   = 100;
	horizontalScale = 50;
	//デフォルト6要素の中では「かな」のみ有効な設定
	//trueで文字の中心点から変倍し文字の幅を保持。
	scaleOption     = true; //ベースラインシフトがゼロ以外だとTrueにしても無効になる
}

//全確約物--2
//設定を省略するとデフォルトの小塚明朝なりTimesになるので同じなら継承します

cFontEnt[2].properties = cFontEnt[0].properties;

//全角記号--3
//継承してオーバーライドみたいな

cFontEnt[3].properties    = cFontEnt[0].properties;
cFontEnt[3].fontStyle     = "B"
cFontEnt[3].verticalScale = 150;


//半角欧文--4
//デフォルトまま

//半角数字
with(cFontEnt[5]){
	appliedFont     = "Century Old Style Std";
	fontStyle       = "Italic";
	relativeSize    = 125;
	baselineShift   = 0;
	verticalScale   = 50;
	horizontalScale = 75;
}

//特例文字とかあらたに要素を追加したい。
var myEnt = cFont.compositeFontEntries.add();
with(myEnt){
	appliedFont     = "A-OTF 新ゴ Pro";
	fontStyle       = "L";
	relativeSize    = 100;
	baselineShift   = 0;
	verticalScale   = 100;
	horizontalScale = 50;
	scaleOption     = true; //trueで文字の中心点から変倍し文字の幅を保持。ベースラインシフトがゼロ以外だとTrueにしても無効になる
	
	//特例文字を入れておく
	customCharacters = "イタリアに合成"; 
}
