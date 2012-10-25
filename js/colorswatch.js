var swatch = (
	function() {
		var swatch = function ( uniqueID, holderObject, backgroundColor, classType){
			this.holder = holderObject.getSelector();
			this.holderObject = holderObject;
			this.backgroundcolor = '';
			this.id = uniqueID;
			this.type = classType;
			this.backgroundimage = '';
			this.backgroundrepeat = '';
			this.bordercolor = '';
			this.color = '';
			this.fontstyle = '';
			this.fontsize = '';
			this.selectors = '';
			this.needsSelectors = false;
			$(this.holder).append('<div id="' + this.id + '" style="background-color:' + backgroundColor + '; border-left-color:black; border-top-color:black; border-right-color:black; border-bottom-color:black;" class="' + classType + ' swatch inactive">[Unassigned]</div>');

			$(this.holder).find('#' + this.id).on('click', function(e){
					var element = $('#' + this.id); //Load the clicked tab
				
					if(element.hasClass('active')) return false; //If the tab is already in use, ignore the click.
				
					//Select the swatches as a list by calling every swatch-class element
					var swatches = $('.swatch');
			
					//Reset all tabs
					swatches.removeClass('inactive active'); 
					swatches.addClass('inactive');

					//Set the targeted tab back to an active state
					element.removeClass('inactive');
					element.addClass('active');
				
					//Prevent further reactions to the click
					e.preventDefault();
			});
			
			this.setSelectorNeed = function(bool) {
				this.needsSelectors = bool;
			}
			
			this.getCSSMapping = function() {
				var selectorArr = new Array();
				if(this.selectors == ''){return selectorArr;}
				selectorArr['selector'] = this.selectors;
				selectorArr['styles'] = new Array();
				if(this.backgroundcolor != ''){ selectorArr['styles']['background-color'] = this.backgroundcolor; }
				if(this.backgroundimage != ''){ selectorArr['styles']['background-image'] = this.backgroundimage; }
				if(this.backgroundrepeat != ''){ selectorArr['styles']['background-repeat'] = this.backgroundrepeat; }
				if(this.bordercolor != ''){ selectorArr['styles']['border-color'] = this.bordercolor; }
				if(this.color != ''){ selectorArr['styles']['color'] = this.color; }
				if(this.fontstyle != ''){ selectorArr['styles']['font-style'] = this.fontstyle; }
				if(this.fontsize != ''){ selectorArr['styles']['font-size'] = this.fontsize; }
				return selectorArr;
			}
			
			this.selectorNotification = function(bool) {
				var swatch = this;
				if($(this.holder).find('#' + this.id).size() != 1){return;}
				var loopNotification = function(aSwatch, aBool) { aSwatch.selectorNotification(aBool); }
				var thisSwatch = $(this.holder).find('#' + this.id);
				if(this.selectors == '' && this.needsSelectors == true){
					if(bool==false){thisSwatch.html('[Unassigned]<br><div id="animtxt">Need Selectors</div>');}

					var bgcolor = thisSwatch.css('background-color');
					var color; 
					if(bgcolor.substring(0,4) == 'rgb('){	bgcolor = rgb2hex(bgcolor);	}
					if(bgcolor.substring(0,1) == '#'){
						var fontcolor = hexToRgb(bgcolor);
						fontcolor = rgbToHsv(fontcolor[0],fontcolor[1],fontcolor[2]);
						fontcolor[0] = fontcolor[0] - 180;
						if(fontcolor[0] < 0){fontcolor[0] = 360 + fontcolor[0];}
						fontcolor[1] = 100 - fontcolor[1];
						//if(fontcolor[1] < 70 && fontcolor[1] > 40){fontcolor[1] += 30;}
						fontcolor[2] = 100 - fontcolor[2];
						if(fontcolor[2] < 70 && fontcolor[2] > 40){fontcolor[2] += 30;}
						fontcolor = hsvToRgb(fontcolor[0],fontcolor[1],fontcolor[2]);
						color = rgbToHex(fontcolor[0],fontcolor[1],fontcolor[2]);
					}else{
						color = 'black';
					}
					
					
					if(bool){ thisSwatch.find('#animtxt').fadeIn(1000,"swing");}
					else{ thisSwatch.find('#animtxt').fadeOut(1000,"swing");}
					
					window.setTimeout(
						function() {
							loopNotification(swatch,!bool);
						},2500);
				}else{
					if(this.selectors == '' || this.selectors == undefined) { thisSwatch.html('[Unassigned]'); }
					else{ thisSwatch.html(this.selectors); }
				}
			}
			
			this.getID = function() {
				return this.id;
			};

			this.deleteSwatch = function() {
				$(this.holder).find('#' + this.id).remove();
			}

			this.moveSwatch = function(newHolder) {
				$(this.holder).find('#' + this.id).removeClass(this.type);
				$(this.holder).find('#' + this.id).addClass(newHolder.getType());
				$(this.holder).find('#' + this.id).appendTo(newHolder.getSelector());
				this.holderObject = newHolder;
				this.type = holderObject.getType();
				this.holder = this.holderObject.getSelector();
				this.holderObject.addExistingSwatch(this);
			};
			
			this.getSelectors = function() {
				return this.selectors;
			}
			
			this.setProperty = function(property, value) {
				var toSet = value;
				var thisSwatch = $(this.holder).find('#' + this.id);
				if(value == null || value == '' || value == undefined){
					toSet = '';
					if(property == 'background-color'){thisSwatch.css('background-color','white');}
					if(property == 'border-color'){
						thisSwatch.css('border-left-color','black');
						thisSwatch.css('border-top-color','black');
						thisSwatch.css('border-right-color','black');
						thisSwatch.css('border-bottom-color','black');
					}
					if(property == 'color'){thisSwatch.css('color','black');}
					if(property == 'selectors'){thisSwatch.html('[Unassigned]');}
				}
				
				//Adjust font color when not manually set
				if((property == 'background-color' && this.color == '') || (property == 'color' && toSet == '')) {				
					var bgcolor = this.backgroundcolor;
					if(property == 'background-color'){
						if(toSet == ''){bgcolor = '#FFFFFF';}
						else{bgcolor = toSet;}
					}
					var color; 
					if(bgcolor.substring(0,4) == 'rgb('){	bgcolor = rgb2hex(bgcolor);	}
					if(bgcolor.substring(0,1) == '#'){
						var fontcolor = hexToRgb(bgcolor);
						fontcolor = rgbToHsv(fontcolor[0],fontcolor[1],fontcolor[2]);
						fontcolor[0] = fontcolor[0] - 180;
						if(fontcolor[0] < 0){fontcolor[0] = 360 + fontcolor[0];}
						fontcolor[1] = 100 - fontcolor[1];
						//if(fontcolor[1] < 70 && fontcolor[1] > 40){fontcolor[1] += 30;}
						fontcolor[2] = 100 - fontcolor[2];
						if(fontcolor[2] < 70 && fontcolor[2] > 40){fontcolor[2] += 30;}
						fontcolor = hsvToRgb(fontcolor[0],fontcolor[1],fontcolor[2]);
						color = rgbToHex(fontcolor[0],fontcolor[1],fontcolor[2]);
					}else{
						color = 'black';
					}
					thisSwatch.css('color',color);
				}
				
				if(property == 'selectors'){
					thisSwatch.html(value);
					this.selectors = toSet;
					return true;
				}else if(property == 'background-color'){
					if(toSet!=''){thisSwatch.animate({backgroundColor: value}, 1000);}
					else{thisSwatch.css('backgroundColor','white');}
					this.backgroundcolor = toSet;
					return true;
				}else if(property == 'background-image'){
					thisSwatch.css('background-image',value);
					this.backgroundimage = toSet;
					return true;
				}else if(property == 'background-repeat'){
					thisSwatch.css('background-repeat',value);
					this.backgroundrepeat = toSet;
					return true;
				}else if(property == 'border-color'){
					if(toSet!=''){
						thisSwatch.animate({borderLeftColor: value, borderTopColor: value, borderRightColor: value, borderBottomColor: value}, 1000);
					}
					else{
						thisSwatch.css('border-left-color','black');
						thisSwatch.css('border-top-color','black');
						thisSwatch.css('border-right-color','black');
						thisSwatch.css('border-bottom-color','black');
					}
					this.bordercolor = toSet;
					return true;
				}else if(property == 'color'){
					if(toSet!=''){thisSwatch.animate({color: value}, 1000);}
					else{thisSwatch.css('color','black');}
					this.color = toSet;
					return true;
				}else if(property == 'font-style'){
					thisSwatch.css('font-style',value);
					this.fontstyle = toSet;
					return true;
				}else if(property == 'font-size'){
					thisSwatch.css('font-size',value);
					this.fontsize = toSet;
					return true;
				}else{
					return false;
				}
			};
			
			this.getCSS = function() {
				if(this.selectors == ''){return '';}
				var css = this.selectors + ' {\n<br>';
				var thisSwatch = $(this.holder).find('#' + this.id);
				if(this.backgroundcolor != ''){ css += "\tbackground-color:" + this.backgroundcolor + ";\n<br>"; }
				if(this.backgroundimage != ''){ css += "\tbackground-image:" + this.backgroundimage + ";\n<br>"; }
				if(this.backgroundrepeat != ''){ css += "\tbackground-repeat:" + this.backgroundrepeat + ";\n<br>"; }
				if(this.bordercolor != ''){ css += "\tborder-color:" + this.bordercolor + ";\n<br>"; }
				if(this.color != ''){ css += "\tcolor:" + this.color + ";\n<br>"; }
				if(this.fontstyle != ''){ css += "\tfont-style:" + this.fontstyle + ";\n<br>"; }
				if(this.fontsize != ''){ css += "\tfont-size:" + this.fontsize + ";\n<br>"; }
				css += "}\n<br>";
				return css;
			};				
		};
		return function ( uniqueID, holderSelector, backgroundColor, classType ) {return new swatch( uniqueID, holderSelector, backgroundColor, classType );};
	}
)();

var swatchHolder = (
	
	function() {
		var swatchHolder = function (div, type){
			this.div = div;
			this.type = type;
			this.activeSwatch = null;
			this.swatches = new Array();
									
			this.getSelector = function() {
				return this.div;
			}

			this.getType = function() {
				return this.type;
			}
									
			//Return the active swatch(es). For the sake of testing, mostly.
			this.getActiveSwatch = function() {
				for(var i=0;i<this.swatches.length;i++){
					var selector = this.swatches[i].getID();
					if($(this.div).find('#' + selector).hasClass('active')){
						return this.swatches[i];
					}
				}
				return null;
			};

			this.addExistingSwatch = function(swatch) {
				this.swatches.push(swatch);
			}
			
			//Return all owned swatches/
			this.getSwatches = function() {
				return this.swatches;
			};
			
			this.getSwatch = function(swatchName) {
				for(var i=0;i<this.swatches.length;i++){
					var selector = this.swatches[i].getID();
					if(selector == swatchName){
						return this.swatches[i];
					}
				}
				return null;
			};
			
			//Return true if swatch(es) exists, false otherwise.
			this.hasSwatch = function(swatchName) {
				return ($(this.div).find('#' + swatchName).size()>0);
			};

			//countSwatches
			//Count swatches for debugging
			this.countSwatches = function() {
				return $(this.div).find('.swatch').size();
			};

			//removeSwatch
			//Removes swatch with ID swatchName from this swatchHolder but NOT from the HTML page
			this.removeSwatch = function(swatchName) {
				for(var i=0;i<this.swatches.length;i++){
					if(this.swatches[i].getID() == swatchName){
						this.swatches.splice(i,1);
						break;
					}
				}
			};

			//addSwatch
			//Input: Something to hold the swatch, a suitable name for the swatch ID, and a primary color for the swatch
			this.addSwatch = function(swatchName,color) {
				this.swatches.push(new swatch(swatchName,this,color,this.type));
			};
		};
		return function ( div, type ) {return new swatchHolder( div, type );};
	}
)();
