/**
 *  for Photoshop opacty50 + save as for web
 */

var doc_obj = app.activeDocument;
var sel_obj = doc_obj.selection;
sel_obj.invert();
var lay_obj = doc_obj.artLayers.add();

RGBColor = new SolidColor();
RGBColor.red   = 0;
RGBColor.green = 0;
RGBColor.blue  = 0;

sel_obj.fill(RGBColor, ColorBlendMode.NORMAL, 50, false);

/*
ColorBlendMode.BEHIND
ColorBlendMode.CLEAR 消去
ColorBlendMode.COLOR カラー
ColorBlendMode.COLORBURN 焼き込みカラー
ColorBlendMode.COLORDODGE 覆い焼きカラー
ColorBlendMode.DARKEN 比較（暗）
ColorBlendMode.DIFFERENCE 差の絶対値
ColorBlendMode.DISSOLVE ディザ合成
ColorBlendMode.EXCLUSION 除外
ColorBlendMode.HARDLIGHT ハードライト
ColorBlendMode.HUE 色相
ColorBlendMode.LIGHTEN 比較（明）
ColorBlendMode.LINEARBURN 焼き込み（リニア）
ColorBlendMode.LINEARDODGE 覆い焼き（リニア）
ColorBlendMode.LINEARLIGHT リニアライト
ColorBlendMode.LUMINOSITY 輝度
ColorBlendMode.MULTIPLY 乗算
ColorBlendMode.NORMAL 通常
ColorBlendMode.OVERLAY オーバーレイ
ColorBlendMode.PASSTHROUGH
ColorBlendMode.PINLIGHT ピンライト
ColorBlendMode.SATURATION 彩度
ColorBlendMode.SCREEN スクリーン
ColorBlendMode.SOFTLIGHT ソフトライト
ColorBlendMode.VIVIDLIGHT ビビッドライト
*/

doc_obj.flatten();