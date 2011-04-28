var myMainPanel=new Window ('dialog', 'ずら', [0,0,300,150]);
myMainPanel.center();

//普通のstatictext
myMainPanel.add('statictext',[10,10,280,25],
	'This is normal static text: ノーマル');

//Harbさんによるbold処理
var font = myMainPanel.graphics.font.family;
var fontSize = myMainPanel.graphics.font.size;
var boldFont = ScriptUI.newFont (font,'BOLD',fontSize);
var myText = myMainPanel.add('statictext',[10,10+20,280,25+20],
	'This is ScriptUI bold text: 正統派ボールド処理');
myText.graphics.font = boldFont;


//Roy Marshallさんによるずらし処理
myMainPanel.add('statictext',[10,10+60,280,25+60],
	'This is shifted text 0.5px: ずらしてみる処理');
myMainPanel.add('statictext',[10,10+60.5,280,25+60.5],
	'This is shifted text 0.5px: ずらしてみる処理');

myMainPanel.add('statictext',[10,10+80,280,25+80],
	'This is shifted text 1px: ずらしてみる処理');
myMainPanel.add('statictext',[10,10+81,280,25+81],
	'This is shifted text 1px: ずらしてみる処理');

myMainPanel.add('statictext',[10,10+100,280,25+100],
	'This is shifted text 1.5px: ずらしてみる処理');
myMainPanel.add('statictext',[10,10+101.5,280,25+101.5],
	'This is shifted text 1.5px: ずらしてみる処理');

myMainPanel.show();

