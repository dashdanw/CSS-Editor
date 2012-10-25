//addTab
//Input: ul element holding the tabs, the tab display text, the div id the tab loads
//Adds a tab to the list
function addTab(tabHolder,tabContent,divTarget) {
	//Ensure the holder and target exist and are compatible
	if($('div.'+divTarget).size() == 0){return false;} //Div target doesn't exist or isn't a div
	if(tabHolder.toLowerCase().indexOf("ul.") < 0){return false;} //The holder isn't a list
	if($(tabHolder).size() == 0){return false;} //The holder doesn't exist
	
	//Identify it via its link for future removal,
	//since displayed text may be irrelevant and is more likely to have complex characters
	var tabname = "listtab" + divTarget.split(' ').join('');

	//Write out the HTML needed to express the tab button with decorative span ends
	$(tabHolder).append($('<li class="'+tabname+'"><a href="#" class="tab inactive">'+tabContent+'<span class="tabimg left"/><span class="tabimg right"/></a></li>'));		
	
	//Write the div data into a data entry called 'div', so the button 'knows' which div it owns
	$(tabHolder).find('a:contains('+tabContent+')').data('div',divTarget); 
	//Set the newly generated tab to be clickable
	setTabs();
	return hasTab(tabHolder,tabContent,divTarget);
}

//Return the active tab, or null if there is more than one. For the sake of testing which tab is displayed.
function getCurrentDisplay(tabHolder) {
	if($(tabHolder).find('.tab.active').size() != 1){return null;}
	return $(tabHolder).find('.tab.active');
}

//Emulate a click event on a certain tab
function manualSelect(tabHolder,divTarget){
	if($(tabHolder).find('.tab').size()==0){return false;} //Can't click something that doesn't exist!
	var tabs = $(tabHolder).find('.tab');
	var i = 0;
	for (i=0;i<=tabs.size();i++){
		if(tabs.eq(i).data('div')){
			if(tabs.eq(i).data('div').indexOf(divTarget) >= 0){
				tabs.eq(i).click();
				return true;
			}
		}
	}
	return false;
}

//Return true if tab exists, false otherwise.
function hasTab(tabHolder,tabContent,divTarget) {
	return ($(tabHolder).find('a:contains('+tabContent+')').size() == 1);
}

//Returns the number of links held by the tab holder
function tabCount(tabHolder) {
	return $(tabHolder).find('.tab').size();
}

//removeTab
//Input: ul element holding the tabs, the div the button targets 
function removeTab(tabHolder,divTarget) {
	if($(tabHolder).find('.tab').size()==0){return false;} //Can't remove something that doesn't exist!
	var tabname = "listtab" + divTarget.split(' ').join('');
	$('.'+tabname).remove();
	return ($('.'+tabname).size() == 0);
}

//When ready to redefine the clicking function
function setTabs(){

	//Define the behavior of each tab when clicked.
	var tabs = $('.tab');
	
	tabs.click(
		function(e){
			var element = $(this); //Load the clicked tab
		
			if(element.hasClass('active')) return false; //If the tab is already in use, ignore the click.
		
			//Select the tabs as a list by calling every tab-class element
			var tabs = $('.tab');
	
			//Reset all tabs
			tabs.removeClass('inactive'); 
			tabs.removeClass('active');
			tabs.addClass('inactive');

			//Set the targeted tab back to an active state
			element.removeClass('inactive');
			element.addClass('active');
		
			//Relayer the tabs so that the active tab is on top, and hide the inactive tabs.
			element.parents('#tabviewer').find('.tabdisplay').css('z-index', '1');
			element.parents('#tabviewer').find('.tabdisplay').hide();
			element.parents('#tabviewer').find('.' + element.data('div')).css('z-index', '2');
			element.parents('#tabviewer').find('.' + element.data('div')).show();
			
			//Prevent further reactions to the click
			e.preventDefault();
		}
	)
	
	//Select the first tab by default, to prevent the unknown case where no tabs are pressed...
	tabs.eq(0).click();
}


