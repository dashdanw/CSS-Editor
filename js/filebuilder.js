function randomXToY(minVal,maxVal) {
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return Math.round(randVal);
}

function fileBuilder(){
	var fData = $('#cssoutputContents').text();
	$.post("filebuilder.php", { cssdata: fData } , 
	function(data){
		window.open(data);
	});
}