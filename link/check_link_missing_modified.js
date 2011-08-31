/**
 * check milling or outofdate links
 */

var doc = app.documents[0];
$.writeln( check_link_missing (doc) );

function check_link_missing (doc) {
  var all_link_stat = doc.links.everyItem().status.toString();
  var err_arr = [];
  if(all_link_stat.indexOf ("1819109747",0) != -1 || all_link_stat.indexOf ("1819242340",0) != -1) {
    var link_obj = doc.links;
    var m = 0;
    var o = 0;
    for(var i=0, iL=link_obj.length; i < iL; i++){
      var link_stat = link_obj[i].status;
      if (link_stat === LinkStatus.LINK_MISSING){
        err_arr.push(link_obj[i].name);
        m++
      }
      else if (link_stat === LinkStatus.LINK_OUT_OF_DATE) {
        err_arr.push(link_obj[i].name);
        o++
      };
    }
  err_arr.unshift("リンク切れ:"+m+"と未更新のリンク:"+o+"がある");
  }
  return err_arr;
}
