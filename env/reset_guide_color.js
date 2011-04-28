//ガイドの色のリセット
//ドキュメント上のガイド全部リセット
app.documents[0].guides.everyItem().guideColor = UIColors.CYAN;
//ドキュメントページだけリセット
app.documents[0].pages.everyItem().guides.everyItem().guideColor = UIColors.CYAN;
//マスターページだけリセット（再描画させないと反映されない？）
app.documents[0].masterSpreads.everyItem().guides.everyItem().guideColor = UIColors.CYAN;