$(document).ready(function(){ 
	//Create the display tabs
	addTab('ul.tabselect','Bookmarked Colors','bookmarkcolors');
	addTab('ul.tabselect','Colors Used in the Site','usedcolors');
	addTab('ul.tabselect','CSS Output','cssoutput');

	var bookmarkHolder = new swatchHolder('#bookmarkcolorsContents','bookmarkswatch');
	var usedcolorsHolder = new swatchHolder('#usedcolorsContents','usedcolorswatch');

	updateBookmarks(bookmarkHolder,usedcolorsHolder);
	
	updateUseds(usedcolorsHolder,bookmarkHolder);
	$('#bookmarkcolorsContents').mousedown( function() {
		bookmarkHolder.addSwatch('swatch' + (uid++),'transparent');
		updateBookmarks(bookmarkHolder,usedcolorsHolder);
		}
	);
	
	$('#usedcolorsContents').mousedown( function() {
		var oldid = 'swatch' + uid;
		usedcolorsHolder.addSwatch('swatch' + (uid++),'transparent');
		var swatch = usedcolorsHolder.getSwatch(oldid);
		if(swatch != null) {swatch.setSelectorNeed(true); swatch.selectorNotification(false);}
		updateUseds(usedcolorsHolder,bookmarkHolder);
		}
	);
	
	$('#demobutton').mousedown( function() { 
		setDemo(usedcolorsHolder);
	});
	
	//instantiate farbtastic colormatrix
	$('#colormatrix').farbtastic('#color');


	//instantiate the sliders from jqueryui
	$('#hueslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 360,
		value: 12,
	});
	$('#satslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 12,
	});
	$('#valslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 100,
		value: 12,
	});
	$('#redslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 12,
	});
	$('#greenslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 34,
	});
	$('#blueslider').slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 56,
	});

	//slider action handler
	$('#hueslider').mousedown(function() {
		$('#hueinput').val($('#hueslider').slider('value'));
		updateFromHsv();
		$(document).mousemove(function() {
			$('#hueinput').val($('#hueslider').slider('value'));
			updateFromHsv();
		});
	});
	$('#satslider').mousedown(function() {
		$('#satinput').val($('#satslider').slider('value'));
		updateFromHsv();
		$(document).mousemove(function() {
			$('#satinput').val($('#satslider').slider('value'));
			updateFromHsv();
		});
	});
	$('#valslider').mousedown(function() {
		$('#valinput').val($('#valslider').slider('value'));
		updateFromHsv();
		$(document).mousemove(function() {
			$('#valinput').val($('#valslider').slider('value'));
			updateFromHsv();
		});
	});
	$('#redslider').mousedown(function() {
		$('#redinput').val($('#redslider').slider('value'));
		updateFromRgb();
		$(document).mousemove(function() {
			$('#redinput').val($('#redslider').slider('value'));
			updateFromRgb();
		});
	});
	$('#greenslider').mousedown(function() {
		$('#greeninput').val($('#greenslider').slider('value'));
		updateFromRgb();
		$(document).mousemove(function() {
			$('#greeninput').val($('#greenslider').slider('value'));
			updateFromRgb();
		});
	});
	$('#blueslider').mousedown(function() {
		$('#blueinput').val($('#blueslider').slider('value'));
		updateFromRgb();
		$(document).mousemove(function() {
			$('#blueinput').val($('#blueslider').slider('value'));
			updateFromRgb();
		});
	});

	//RGB value change events
	$('#hueinput').keydown(function() {
		$('#hueslider').slider('value',$('#hueinput').val());
		updateFromHsv();
	});
	$('#hueinput').keyup(function() {
		$('#hueslider').slider('value',$('#hueinput').val());
		updateFromHsv();
	});
	$('#satinput').keydown(function() {
		$('#satslider').slider('value',$('#satinput').val());
		updateFromHsv();
	});
	$('#satinput').keyup(function() {
		$('#satslider').slider('value',$('#satinput').val());
		updateFromHsv();
	});
	$('#valinput').keydown(function() {
		$('#valslider').slider('value',$('#valinput').val());
		updateFromHsv();
	});
	$('#valinput').keyup(function() {
		$('#valslider').slider('value',$('#valinput').val());
		updateFromHsv();
	});
	$('#redinput').keydown(function() {
		$('#redslider').slider('value',$('#redinput').val());
		updateFromRgb();
	});
	$('#redinput').keyup(function() {
		$('#redslider').slider('value',$('#redinput').val());
		updateFromRgb();
	});
	$('#greeninput').keydown(function() {
		$('#greenslider').slider('value',$('#greeninput').val());
		updateFromRgb();
	});
	$('#greeninput').keyup(function() {
		$('#greenslider').slider('value',$('#greeninput').val());
		updateFromRgb();
	});
	$('#blueinput').keydown(function() {
		$('#blueslider').slider('value',$('#blueinput').val());
		updateFromRgb();
	});
	$('#blueinput').keyup(function() {
		$('#blueslider').slider('value',$('#blueinput').val());
		updateFromRgb();
	});

	//update from hex field
	$('#color').keydown(function() {
		updateFromHex($('#color').val());
	});
	$('#color').keyup(function() {
		updateFromHex($('#color').val());
	});
	
	//update from hexwheel
	$('.marker').mousemove(function() {
			updateFromHex($.farbtastic('#colormatrix').color);
	});
	$('.marker,.overlay,.color,.wheel,.farbtastic').mousedown(function () {
		historyCycle($('#color').val());
	});
	
	//cycle the history
	$('#hueslider,#satslider,#valslider,#redslider,#greenslider,#blueslider').mousedown(function() {
		historyCycle($('#color').val());
	});
	$('#hueinput,#satinput,#valinput,#redinput,#greeninput,#blueinput,#color').change(function() {
		historyCycle($('#color').val());
	});

	module('Test tab controls.');
	
	test('addTab()', function() { 
		ok( addTab('ul.tabHolder','Test tab','tabDisplay'), 'Can create a valid tab.'); 
		ok( !addTab('tabHolder','Test tab','tabDisplay'), 'Requires a UL to add to.'); 
		ok( !addTab('ul.tabHolder','Test tab','tabHolder'), 'Requires a valid DIV to point to.');
		ok( addTab('ul.tabHolder', 'Second test', 'alternateTabDisplay'), 'Can create a second tab.');
	});

	test('tabCount()', function() {
		equal( tabCount('ul.tabHolder'), 2, 'Can count tabs.');
		equal( tabCount('tabDisplay'), 0, 'Doesn\'t count unusable tabs.');
	});

	test('removeTab()', function() {
		ok( removeTab('ul.tabHolder','alternateTabDisplay'), 'Can remove an existing tab.');
		ok( !removeTab('tabDisplay'), 'Doesn\'t remove an non-existing tab.');
	});

	module('Test partial tab behavior.');

	test('Display Behavior', function() {
		expect(4);
		addTab('ul.tabHolder', 'Second test', 'alternateTabDisplay');
		ok(manualSelect('ul.tabHolder','alternateTabDisplay'), 'Can manually select an existing tab.');
		ok(!manualSelect('ul.tabHolder','alternateAlternateTabDisplay'), 'Can\'t manually select an non-existent tab.');
		var display = getCurrentDisplay('ul.tabHolder');
		ok(display.data('div').indexOf('alternateTabDisplay') >= 0, 'Display did not toggle.');
		manualSelect('ul.tabHolder','tabDisplay');
		display = getCurrentDisplay('ul.tabHolder');
		ok(display.data('div').indexOf('tabDisplay') >= 0, 'Display could be toggled back.');
	});

	module('Test external color picker behaviors.');
	
	test('Color Picker', function() {
		var color = $.farbtastic('#colormatrix').color;
		$.farbtastic('#colormatrix').setColor('test');
		var color2 = $.farbtastic('#colormatrix').color;
		notEqual(color , color2, 'Color may be changed.');
		notEqual(color , 'test', 'Non-hex colors ignored.');
	});
	
	module('Test full color selector module behaviors');
	test('History Functions', function() {
		historyCycle('#000001');
		historyCycle('#000002');
		historyCycle('#000003');
		historyCycle('#000004');
		historyCycle('#000005');
		equal($('#history3').css('background-color'), 'rgb(0, 0, 3)', 'Color history can be changed.');		
		updateFromHistory($('#history3'));
		color = $.farbtastic('#colormatrix').color;
		equal(color , '#000003', 'Color may be changed via history tabs.');
	});	
	test('Updating sliders/displays from hex inputs', function() {
		updateFromHex('#102030');
		equal($('#redslider').slider('value'),'16','Correct red set by hex.');
		equal($('#greenslider').slider('value'),'32','Correct green set by hex.');
		equal($('#blueslider').slider('value'),'48','Correct blue set by hex.');
		
		equal($('#hueslider').slider('value'),'210','Correct hue set by hex.');
		equal($('#satslider').slider('value'),'67','Correct saturation set by hex.');
		equal($('#valslider').slider('value'),'19','Correct value set by hex.');
		var color = $.farbtastic('#colormatrix').color;
		equal(color,'#102030','Correct hex value set by hex.');
	});	
	test('Zero settings', function() {	
		updateFromHex('#000000');
		
		equal($('#redslider').slider('value'),'0','Red set to zero.');
		equal($('#greenslider').slider('value'),'0','Green set to zero.');
		equal($('#blueslider').slider('value'),'0','Blue set to zero.');
		
		equal($('#hueslider').slider('value'),'0','Hue set to zero.');
		equal($('#satslider').slider('value'),'0','Saturation set to zero.');
		equal($('#valslider').slider('value'),'0','Value set to zero.');
		color = $.farbtastic('#colormatrix').color;
		equal(color,'#000000','Hex set to zero.');
	});	
	test('Updating from HSV', function() {
		$('#hueinput').val(210);
		$('#satinput').val(67);
		$('#valinput').val(19);
		$('#hueslider').slider('value',210);
		$('#satslider').slider('value',67);
		$('#valslider').slider('value',19);
		updateFromHsv();
		equal($('#redslider').slider('value'),'16','Correct red set by hsv.');
		equal($('#greenslider').slider('value'),'32','Correct green set by hsv.');
		equal($('#blueslider').slider('value'),'48','Correct blue set by hsv.');
		
		equal($('#hueslider').slider('value'),'210','Correct hue set by hsv.');
		equal($('#satslider').slider('value'),'67','Correct saturation set by hsv.');
		equal($('#valslider').slider('value'),'19','Correct value set by hsv.');
		color = $.farbtastic('#colormatrix').color;
		equal(color,'#102030','Correct hex value set by hsv.');
	});	
	test('Updating from RGB', function() {
		updateFromHex('#000000');
		$('#redinput').val(16);
		$('#greeninput').val(32);
		$('#blueinput').val(48);
		$('#redslider').slider('value',16);
		$('#greenslider').slider('value',32);
		$('#blueslider').slider('value',48);
		updateFromRgb();
		equal($('#redslider').slider('value'),'16','Correct red set by rgb.');
		equal($('#greenslider').slider('value'),'32','Correct green set by rgb.');
		equal($('#blueslider').slider('value'),'48','Correct blue set by rgb.');
		
		equal($('#hueslider').slider('value'),'210','Correct hue set by rgb.');
		equal($('#satslider').slider('value'),'67','Correct saturation set by rgb.');
		equal($('#valslider').slider('value'),'19','Correct value set by rgb.');
		color = $.farbtastic('#colormatrix').color;
		equal(color,'#102030','Correct hex value set by rgb.');
	});
	
	module('Testing swatch management');
	test('Adding/removing swatches', function() {
		var testHolder = usedcolorsHolder;
		equal(testHolder.getSwatches().length,0,'Can confirm no swatches present.');
		testHolder.addSwatch('swatch1','transparent');
		equal(testHolder.getSwatches().length,1,'Can add swatch.');
		testHolder.addSwatch('swatch2','transparent');
		equal(testHolder.getSwatches().length,2,'Can add second swatch.');
		testHolder.removeSwatch('swatch2');
		equal(testHolder.getSwatches().length,1,'Can remove specific swatches.');
		testHolder.addSwatch('swatch2','transparent');
		equal(testHolder.getSwatches().length,2,'Can add swatch after removal.');
	});	
	
	test('Testing swatch property storage',function() {
		var testHolder = usedcolorsHolder;
		testHolder.removeSwatch('swatch1');
		testHolder.removeSwatch('swatch2');
		testHolder.addSwatch('swatch0','transparent');
		var testSwatch = testHolder.getSwatches()[0];
		testSwatch.setProperty('selectors','.test');
		var testCondition = true;
		var newArr = testSwatch.getCSSMapping();
		var selector = newArr['selector'];
		for(key in newArr['styles']){
			if(key == 'background-color'){testCondition = false;}
			if(key == 'border-color'){testCondition = false;}
			if(key == 'color'){testCondition = false;}
		}		
		ok(testCondition,'Can initialize a blank swatch.');

		testSwatch.setProperty('border-color','#111111');
		testCondition = false;
		newArr = testSwatch.getCSSMapping();
		selector = newArr['selector'];
		for(key in newArr['styles']){
			if(key == 'border-color'){testCondition = ('#111111' == newArr['styles']['border-color']);}	
		}		
		ok(testCondition,'Can alter the border color');

		testSwatch.setProperty('background-color','#222222');
		testCondition = false;
		newArr = testSwatch.getCSSMapping();
		selector = newArr['selector'];
		for(key in newArr['styles']){
			if(key == 'background-color'){testCondition = ('#222222' == newArr['styles']['background-color']);}	
		}		
		ok(testCondition,'Can alter the background color');

		testSwatch.setProperty('color','#333333');
		testCondition = false;
		newArr = testSwatch.getCSSMapping();
		selector = newArr['selector'];
		for(key in newArr['styles']){
			if(key == 'color'){testCondition = ('#333333' == newArr['styles']['color']);}	
		}		
		ok(testCondition,'Can alter the font color');
		
		testSwatch.setProperty('background-color','');
		testSwatch.setProperty('border-color','');
		testSwatch.setProperty('color','');
		testCondition = true;
		newArr = testSwatch.getCSSMapping();
		selector = newArr['selector'];
		for(key in newArr['styles']){
			if(key == 'background-color'){testCondition = false;}
			if(key == 'border-color'){testCondition = false;}
			if(key == 'color'){testCondition = false;}
		}		
		ok(testCondition,'Can clear swatch properties.');
		testHolder.removeSwatch('swatch0');		
	});
});