var myDialog=app.dialogs.add({name:"test", canCancel: true});

with(myDialog){
	with(dialogColumns.add()){//outline
		
		with(borderPanels.add()){//text edit box
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "Message"});
				}
			with(dialogColumns.add()){
				var myTextEditField = textEditboxes.add({editContents: "hello", minWidth: 140});
				}
			}//text edit box
		
		with(borderPanels.add()){//measurement edit box
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "pointsize"});
				}
			with(dialogColumns.add()){
				var myPointSizeField = measurementEditboxes.add({editValue: 72});
				}
			}//measurement edit box
		
		with(borderPanels.add()){//dropdown
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "dropdown"});
				}
			with(dialogColumns.add){
				var myVerticalJustificationMenu = dropdowns.add({stringList: ["Top","Center","Bottom"],selectedIndex: 0});
				}
			}//dropdown
		
		with(borderPanels.add()){//radio button
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "radio button"});
				var myRadioButtonGroup = radiobuttonGroups.add();
				with (myRadioButtonGroup){
					var LeftRadioButton=radiobuttonControls.add({staticLabel: "Left", checkedState:true});
					var CenterRadioButton= radiobuttonControls.add({staticLabel: "Center"});
					var RightRadioButton = radiobuttonControls.add({staticLabel: "Right"});
					}
				}
			}//radio button
	
		with(borderPanels.add()){//check box
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "check box"});
				}
			//var myCheckEnablingGroup=enablingGroups.add({staticLabel:"all", checkedState:false});
			//with(myCheckEnablingGroup){
			with(dialogColumns.add()){
				var Checkbox1 = checkboxControls.add({staticLabel:"1abcde", checkedState:true});
				var Checkbox2 = checkboxControls.add({staticLabel:"2", checkedState:false});
				var Checkbox3 = checkboxControls.add({staticLabel:"3", checkedState:true});
				}
			}//check box
			
		with(borderPanels.add()){//measurment combo box
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "measurment combo box"});
				}
			with(dialogColumns.add){
				var myPintoMenu = measurementComboboxes.add({stringList: ["3.5","5","8"],editValue:3.5});
				}
			}//measurment combo box
			
		with(borderPanels.add()){//integer combo box
			with(dialogColumns.add()){
				staticTexts.add({staticLabel: "integer combo box"});
				}
			with(dialogColumns.add){
				var myTexMenu = integerEditboxes.add({stringList: ["4","8","0"],editValue:8});
				}
			}//integer combo box
			
	}//outline
}//dialog
		if(myDialog.show()==true){
			var myParagraphAlignment, myString, myPointSize, myVerticalJustification;
			
			myString = myTextEditField.editContents;
			myPointSize = myPointSizeField.editValue;
			if(myVerticalJustificationMenu.selectedIndex == 0){
				myVerticalJustification = VerticalJustification.TOP_ALIGN;
			}
			else if(myVerticalJustificationMenu.selectedIndex == 1){
				myVerticalJustification = VerticalJustification.CENTER_ALIGN;
			}               
			else{               
				myVerticalJustification = VerticalJustification.BOTTOM_ALIGN;
			}               
			                    
			if(myRadioButtonGroup.selectedButton == 0){
				myParagraphAlignment = Justification.LEFT_ALIGN;
			}               
			else if(myRadioButtonGroup.selectedButton == 1){
				myParagraphAlignment = Justification.CENTER_ALIGN;
			}               
			else{               
				mayParagraphAlignment = Justification.RIGHT_ALIGN;
			}
			myDialog.destroy();
			//function here
		}
		else{
			myDialog.destroy();
			}