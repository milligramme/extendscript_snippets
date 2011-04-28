//id cells merged check
function cell_merged_check (cell_obj) {
	var merge_checker = new Array();
	for(var i=0; i < cell_obj.length; i++){
		merge_checker.push(1);
		}
	if(cell_obj.everyItem().columnSpan == merge_checker.toString()){
		return false;
	}
	else{
		return true;
	}
}