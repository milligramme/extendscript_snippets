﻿#target 'InDesign'
//insert special characters to selected textframe


var spchar=[
1396798051, 1396798059, 1396797805, 1396798307, 1396797550, 1396862068, 1396927554, 1396929140, 1396991858, 1396983920, 1397777484, 1396984945, 1396986481, 1396986737, 1397518451, 1397058884, 1397058899, 1397059140, 1397059155, 1396855379, 1397059650, 1397122899, 1399746146, 1397124179, 1399221837, 1397124194, 1397125698, 1397256787, 1397253989, 1397254003, 1397252717, 1397319796, 1399616109, 1397649518, 1397645928, 1397645907, 1397715010, 1397778242, 1397776754, 1397780590, 1397780051, 1397847379, 1397904493, 1397909876, 1400007789, 1400073805, 1400073811, 1397967985, 1397969521, 1397969777, 1397975379, 1397781622, 1398042195, 1398040659, 1398041963, 1397780074
];

for(var i = 0; i< spchar.length; i++){
	app.selection[0].insertionPoints[-1].contents = spchar[i];
}