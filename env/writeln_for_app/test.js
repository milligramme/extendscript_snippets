#include 'writeln_for_app.js'
var wo = app.selection[0].words;

for (var i=0, iL=wo.length; i < iL ; i++) {
  if (wo[i].contents.charAt(0) === "c"){
    wo[i].fillColor = "Paper";
    wo[i].strokeWeight = "0.2pt";
    wo[i].strokeColor = "Black";
    swriteln (wo[i].contents);
  }
};
