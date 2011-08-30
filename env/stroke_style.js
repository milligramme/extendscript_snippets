/**
 * stroke style 
 */

var doc = app.documents[0];
// doc.strokeStyles.everyItem().properties;
presets = [
  {strokeStyleType:"",name:"三重線",id:45082,index:0},
  {strokeStyleType:"",name:"太い - 細い - 太い",id:45065,index:1},
  {strokeStyleType:"",name:"細い - 太い - 細い",id:45064,index:2},
  {strokeStyleType:"",name:"太い - 太い",id:45063,index:3},
  {strokeStyleType:"",name:"太い - 細い",id:45062,index:4},
  {strokeStyleType:"",name:"細い - 太い",id:45061,index:5},
  {strokeStyleType:"",name:"二重線",id:45060,index:6},
  {strokeStyleType:"",name:"句点", id:23103,  index:7},
  {strokeStyleType:"",name:"ホワイトダイヤモンド", id:23102,  index:8},
  {strokeStyleType:"",name:"左斜線ハッシュ", id:23101,  index:9},
  {strokeStyleType:"",name:"右斜線ハッシュ", id:23100,  index:10},
  {strokeStyleType:"",name:"直線ハッシュ", id:23099,  index:11},
  {strokeStyleType:"",name:"波状", id:23098,  index:12},
  {strokeStyleType:"",name:"点", id:23097,  index:13},
  {strokeStyleType:"",name:"点線 (3 & 2)", id:23096,  index:14},
  {strokeStyleType:"",name:"点線 (4 & 4)", id:23095,  index:15},
  {strokeStyleType:"",name:"点線", id:23082,  index:16},
  {strokeStyleType:"",name:"ベタ", id:23081,  index:17}
  ];

doc.dashedStrokeStyles.add({
  dashArray:[2,4,6,8],//
  endCap:EndCap./*BUTT_END_CAP,*/PROJECTING_END_CAP/*,ROUND_END_CAP*/,
  name:"dashed",
  strokeCornerAdjustment: StrokeCornerAdjustment.DASHES/*,GAP,DASHES_AND_GAPS,NONE*/
});

doc.dottedStrokeStyles.add({
  dotArray:[1,2,3,4],
  name:"dotted",
  strokeCornerAdjustment: StrokeCornerAdjustment./*DASHES,GAP,*/DASHES_AND_GAPS/*,NONE*/
});

doc.stripedStrokeStyles.add({
  stripeArray:[0,25,50,75],// length must be even, 
  name:"striped"
})


