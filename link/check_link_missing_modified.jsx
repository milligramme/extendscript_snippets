/**
 * check milling or outofdate links
 */
Array.prototype.include = function (key) {
  var i = this.length;
  while (i--) {
    if (key === this[i]) {return true}
  }
  return false
};

var doc = app.documents[0];
$.writeln( check_link_missing (doc) );

function check_link_missing (doc) {
  var all_link_stat = doc.links.everyItem().status;
  var err_arr = [];

  if (all_link_stat.include (1819109747) || 
      all_link_stat.include (1819242340) || 
      all_link_stat.include (LINK_MISSING) || 
      all_link_stat.include (LINK_OUT_OF_DATE) ) {
    var link_obj = doc.links;
    var m = 0;
    var o = 0;
    for(var i=0, iL=link_obj.length; i < iL; i++){
      var link_stat = link_obj[i].status;
      if (link_stat === LinkStatus.LINK_MISSING){
        err_arr.push("X\t" + link_obj[i].name);
        m++
      }
      else if (link_stat === LinkStatus.LINK_OUT_OF_DATE) {
        err_arr.push("M\t" +link_obj[i].name);
        o++
      };
    }
  err_arr.unshift("リンク切れ(X):"+m+"と未更新のリンク(M):"+o+"がある");
  }
  return err_arr.join("\n");
}

