var uid = 0;
var lastSeen = "";

	
	function editselectors(e,v,m,f){
		lastSeen = f.textline;
		if(lastSeen == ""){
			//return false;
			return true;
		}
		return true;
	}
	
	function updateCSS(holder) {
		var usedColors = holder.getSwatches();
		var css = $('#cssoutputContents');
		css.empty();
		
		for(var i=0;i<usedColors.length;i++){
			css.append(usedColors[i].getCSS() + '\n</br>');
		}
	}
	
	function updateUseds(holder, alternate) {
			$('.usedcolorswatch').destroyContextMenu();
			$('.usedcolorswatch').contextMenu(
			{
				menu: 'usedMenu'
			},
			function(action, el, pos) {
				var swatch = holder.getActiveSwatch();
				if(swatch == null){return;}
				if(action == 'updatebgcolor'){
					swatch.setProperty('background-color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'updatefontcolor'){
					swatch.setProperty('color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'updatebordercolor'){
					swatch.setProperty('border-color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'reset'){
					swatch.setProperty('border-color','');
					swatch.setProperty('background-color','');
					swatch.setProperty('color','');
				}
				if(action == 'delete'){
					holder.removeSwatch(swatch.getID());
					swatch.deleteSwatch();
				}
				if(action == 'edit'){
					var txt = 'Edit your selectors below:<br/><input type="text" name="textline" id="textline" style="width:250px;" value="';
					if(swatch.getSelectors() != undefined){
						txt = txt + swatch.getSelectors();
					}
					function finishUpdate(e,v,m,f) {
						swatch.setProperty('selectors',$.trim(lastSeen));
						updateCSS(holder);
						swatch.selectorNotification(false);
					}
					txt = txt + '" />';
					$.prompt(txt,{
						submit: editselectors,
						callback: finishUpdate,
						buttons: { Ok:true }
					});
				}
				if(action == 'unassign'){
					swatch.moveSwatch(alternate);
					swatch.setSelectorNeed(false);
					updateBookmarks(alternate,holder);
				}
				updateCSS(holder);
				updateUseds(holder,alternate);
			}
		);
		if(holder.countSwatches() == 0){$(holder.getSelector()).html('<p id="emptydisplay">No color swatches are currently active. Click here to create additional swatches.</p>');}
		else{$(holder.getSelector()).find('#emptydisplay').remove();}
	}
	
	function updateBookmarks(holder,alternate) {
		$('.bookmarkswatch').destroyContextMenu();
		$('.bookmarkswatch').contextMenu(
			{
				menu: 'bookmarkMenu'
			},
			function(action, el, pos) {
				var swatch = holder.getActiveSwatch();
				if(swatch == null){return;}
				if(action == 'updatebgcolor'){
					swatch.setProperty('background-color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'updatefontcolor'){
					swatch.setProperty('color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'updatebordercolor'){
					swatch.setProperty('border-color',$.farbtastic('#colormatrix').color);
				}
				if(action == 'reset'){
					swatch.setProperty('border-color','');
					swatch.setProperty('background-color','');
					swatch.setProperty('color','');
				}
				if(action == 'delete'){
					holder.removeSwatch(swatch.getID());
					swatch.deleteSwatch();
				}
				if(action == 'assign'){
					swatch.moveSwatch(alternate);
					swatch.setSelectorNeed(true);
					swatch.selectorNotification(false);
					updateUseds(alternate, holder);
				}
				updateBookmarks(holder,alternate);
			}
		);
		if(holder.countSwatches() == 0){$(holder.getSelector()).html('<p id="emptydisplay">No color swatches are currently bookmarked. Click here to create additional swatches.</p>');}
		else{$(holder.getSelector()).find('#emptydisplay').remove();}
	}