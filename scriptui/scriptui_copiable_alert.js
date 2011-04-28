/**
 * copiable alert for indesign
 * 
 * @param {String|Object|Array|Boolean|Number} alert_str Any 
 */
CopiableAlert( alert_str );

function CopiableAlert( alert_str ){
	if (typeof alert_str !== "string") {
		switch(typeof alert_str){
			case 'number': alert_str = ""+alert_str; break;
			case 'boolean': alert_str = alert_str == true ? "true":"false"; break;
			case 'object': alert_str = alert_str.toSource(); break;
			case 'function': alert_str = alert_str.toSource(); break;
			case 'null': alert_str = "null"; break;
			case 'undefined': alert_str = "undefined"; break;
			default: return; break;
		}
	};
	var dlg = app.dialogs.add({name: "Copiable Alert"});
	with(dlg){
		with(dialogColumns.add()){
			with(dialogRows.add()){
				staticTexts.add({staticLabel: "Copy It"});
			}
			with(dialogRows.add()){
				textEditboxes.add({editContents: alert_str, minWidth: 320});
			}
		}
	}
	if(dlg.show() === true){
		dlg.destroy();
	}
	else{
		dlg.destroy();
	}	
};