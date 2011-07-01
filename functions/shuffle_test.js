/**
 *  shuffle
 */
function shuffle(list) {
	var i = list.length;
	while (--i) {
		var j = Math.floor (Math.random() * (i + 1));
		if (i === j) continue;
			var k = list[i];
			list[i] = list[j];
			list[j] = k;
		}
		return list;
	}