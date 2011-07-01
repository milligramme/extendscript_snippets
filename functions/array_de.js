function sort_and_del_dup (array) {
	array.sort(function(a, b){return a > b});
	for (var i = array.length - 1; i >= 1; i--){
		if (array[i] == array[i-1]) {
			// $.writeln(i);
			array.splice(i,1);
		};
	};
	return array
}

var arr = [11,11,33,12,11,33,14,15,16];
$.writeln(sort_and_del_dup(arr))