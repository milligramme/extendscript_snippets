var convOption;
var convOptNo = prompt("1.斜角の四角形 2.内丸角の四角形 3.多角形 \r4.四角形 5.丸角の四角形 6.三角形 7.楕円",4);

switch(convOptNo){
	case "1": convOption = ConvertShapeOptions.CONVERT_TO_BEVELED_RECTANGLE; break;
	case "2": convOption = ConvertShapeOptions.CONVERT_TO_INVERSE_ROUNDED_RECTANGLE; break;
	case "3": convOption = ConvertShapeOptions.CONVERT_TO_POLYGON; break;
	case "4": convOption = ConvertShapeOptions.CONVERT_TO_RECTANGLE; break;
	case "5": convOption = ConvertShapeOptions.CONVERT_TO_ROUNDED_RECTANGLE; break;
	case "6": convOption = ConvertShapeOptions.CONVERT_TO_TRIANGLE; break;
	case "7": convOption = ConvertShapeOptions.CONVERT_TO_OVAL; break;
	default : convOption = ConvertShapeOptions.CONVERT_TO_OVAL; break;
}

var childrenP = app.selection[0].pageItems;
for(var j = 0; j < childrenP.length; j++){
	childrenP[j].convertShape (convOption, 5, 50, 3);//(convertShapeOption, numberOfSides, insetPercentage, cornerRadius)
}
