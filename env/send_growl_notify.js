/**
 * indesign send growl notify
 * 
 * InDesignのJavaScriptからGrowlに通知を出す【OSX】 - なにする？DTP+WEB 
 * http://d.hatena.ne.jp/kamiseto/20090328/1238215781 
 * 
 * @param {String} title Title
 * @param {String} description Description
 * @example
 *  #include /path/to/send_growl_notify.js
 * send_growl_notify("Info", "Done!");
 * 
 */
function send_growl_notify(title, description){
var app_ver_name = {"50":"CS3", "60":"CS4", "70":"CS5", "75":"CS5.5"};
var app_cs_ver_name = app_ver_name[app.version.split('.')[0]+app.version.split('.')[1]];
var growlNotify = [
  'tell application "GrowlHelperApp"',
  'set the allNotificationsList to {"indesign"}',
  'set the enabledNotificationsList to {"indesign"}',
  'register as application "Indesign Notify" all notifications allNotificationsList default notifications enabledNotificationsList icon of application "Adobe InDesign '+app_cs_ver_name+'"',
  'notify with name "indesign" title "' + title + '" description "' + description + '" application name "Indesign Notify"',
  'end tell'
  ].join('\r');
  app.doScript(growlNotify , ScriptLanguage.APPLESCRIPT_LANGUAGE);
}