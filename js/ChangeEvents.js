function updateFromRgb(){

	//colors to reference
	var r = rgbInput[0].val();
	var g = rgbInput[1].val();
	var b = rgbInput[2].val();

	//conversions
	var hsv = rgbToHsv(r,g,b);
	var hex = rgbToHex(r,g,b);

	$.farbtastic('#colormatrix').setColor(hex);

	hexInput.val(hex);
	hexInput.css('background',hex);
	
	//set other vals
	for(var i = 0; i < 3; i++){
		hsvSlider[i].slider('value', hsv[i]);
		hsvInput[i].val(hsv[i]);
	}

}
function updateFromHsv(){

	//colors to reference
	var h = hsvInput[0].val();
	var s = hsvInput[1].val();
	var v = hsvInput[2].val();

	//conversions
	var rgb = hsvToRgb(h,s,v);
	var hex = hsvToHex(h,s,v);

	//set other vals
	$.farbtastic('#colormatrix').setColor(hex);

	hexInput.val(hex);
	hexInput.css('background',hex);

	for(var i = 0; i < 3; i++){
		rgbSlider[i].slider('value', rgb[i]);
		rgbInput[i].val(rgb[i]);
	}
}
function updateFromHex(){
	//hex value to reference
	var hex = colorInput.val();

	//conversions
	var rgb = hexToRgb(hex);
	var hsv = hexToHsv(hex);

	for(var i = 0; i < 3; i++){
		rgbSlider[i].slider('value', rgb[i]);
		rgbInput[i].val(rgb[i]);
		hsvSlider[i].slider('value', hsv[i]);
		hsvInput[i].val(hsv[i]);
	}
	$.farbtastic('#colormatrix').setColor(hex);
}
function updateFromHex(hex){
	//conversions
	var rgb = hexToRgb(hex);
	var hsv = hexToHsv(hex);
	
	$.farbtastic('#colormatrix').setColor(hex);

	for(var i = 0; i < 3; i++){
		rgbSlider[i].slider('value', rgb[i]);
		rgbInput[i].val(rgb[i]);
		hsvSlider[i].slider('value', hsv[i]);
		hsvInput[i].val(hsv[i]);
	}
}
function updateFromHistory(histTab) {
	var rgbString = histTab.css('background-color');
	if(rgbString[0] == "#");
	else if(rgbString != "transparent"){
		var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		// parts now should be ["rgb(0, 70, 255", "0", "70", "255"]

		delete (parts[0]);
		for (var i = 1; i <= 3; ++i) {
		    parts[i] = parseInt(parts[i]).toString(16);
		    if (parts[i].length == 1) parts[i] = '0' + parts[i];
		} 
		var hex = '#'+parts.join('').toUpperCase();
	}
	else hex = "transparent";
	updateFromHex(hex);

}	
function historyCycle(hex){
	$('#history4').css('background-color',$('#history3').css('background-color'));
	$('#history3').css('background-color',$('#history2').css('background-color'));
	$('#history2').css('background-color',$('#history1').css('background-color'));
	$('#history1').css('background-color',hex);
}