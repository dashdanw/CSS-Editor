function rgbChange(event,input){
	if(event.layerX-360 <= 255 && event.layerX-360 >= 0)
	$(input).val(event.layerX-360);
}
function updateHexfromRGB(){
	//change input fields to actual integers for analysis
	var red = parseInt($('#redinput').val(), 10);
	var green = parseInt($('#greeninput').val(), 10);
	var blue = parseInt($('#blueinput').val(), 10);
	//verify input values are properly entered
	if(red >= 0 && green >= 0  && blue >= 0 && red <= 255 && green <= 255 && green <= 255){
		//prepend a 0 if the hex value will be a single character (ie. F wil need to be 0F in the hex color display)
		if(red <= 15) red = "0" + red.toString(16);
		else red = red.toString(16);
		if(green <= 15) green = "0" + green.toString(16);
		else green = green.toString(16);
		if(blue <= 15) blue = "0" + blue.toString(16);
		else blue = blue.toString(16);
		//concatenate hex values)
		$('#color').val("#" + red + green + blue);
	}
	else alert("invalid rgb value!");
}