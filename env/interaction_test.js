/**
 *  user interaction level test
 *  
 *  Created by mg on 2010-10-07.
 */

//all
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
testPack ("all");
//アラート、プロンプト、確認ダイアログ、フォルダ選択、ダイアログでる
//エラーメッセージでる

app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

//never
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
testPack ("never");
//アラート、プロンプト、確認ダイアログ、フォルダ選択
//ダイアログでない
//エラーメッセージでない
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

//alert
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALERTS;
testPack ("alert");
//アラート、プロンプト、確認ダイアログ、フォルダ選択
//ダイアログでない
//エラーメッセージでない
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;


function testPack (string) {
	alert(string);
	prompt(string,string);
	confirm(string,true);
	Folder.selectDialog();

	//dialog step will be skipped
	var dn = app.dialogs.add({name:string});
	dn.show();
	dn.destroy();
	if (string === "never" || string === "alert") {
		//indd has invalid fonts and links
		app.open(File("~/Desktop/temp/alert_test.indd"));
		//skipped modal dialog
		$.sleep(1000);
		app.documents[0].close();
	};

}