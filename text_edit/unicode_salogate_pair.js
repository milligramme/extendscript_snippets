//20000-2ffff

iL = 0x2ffff - 0x20000;
for (i=0; i < iL; i++){
	x = "0x"+(0x20000 + i).toString(16);
	$.writeln( d(x) );
}

salo(0x2000b);
function salo(x){
	var s;
	var a;  //上位サロゲート
	var b;  //下位サロゲート
	x -= 0x10000;
	a = Math.floor(x / 0x400);  //Math.floor()で整数値に変換
	a += 0xD800;
	b = x % 0x400;
	b += 0xDC00;
	s = String.fromCharCode(a,b);
	return s;
}