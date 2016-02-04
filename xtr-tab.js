	function XtrTab(id){
		var xtrTabPai;

		id = XtrGraficoUtil.isset(id) ? id : "#_xtr_tabs";

		document.addEventListener("DOMContentLoaded", function(event) {
			var xtrTabs,xtrTab;
			var xtrTabIndex;
			
			var element;
			
			xtrTabPai = XtrQuery(id);
			desactivateAll(true);
			if(XtrGraficoUtil.isset(xtrTabPai)){
				xtrTabs = xtrTabPai.children('[data-xtr-tab]');			
				for(xtrTabIndex=0; xtrTabs.length > xtrTabIndex; xtrTabIndex++){
					xtrTab = xtrTabs[xtrTabIndex];
					xtrTab.addEventListener("click",function(event){
						element = new XtrElement(this);
						changeActive(element,true);				
					});
				}
			}		
		});

		function changeActive(element,callOnLoad){
			desactivateAll();
			activate(element,callOnLoad);
		}	
		function changeActiveAndCall(element,callback){
			desactivateAll();
			activate(element);
			callback();
		}
		function activate(element,callOnLoad){
			var CallOnLoad = XtrGraficoUtil.isset(callOnLoad) ? callOnLoad : true;
			if(!(element instanceof XtrElement)){
				if(element instanceof Node){
					element = new XtrElement(element);
				}
				else{
					element = XtrQuery('[data-xtr-tab="'+element+'"]');
				}
			}
			var target = element.target;
			var tab = element;
			tab.addClass('active');
			target.show();
			if(callOnLoad)
				element.onLoad();	
		}
		function desactivateAll(exceptActiveClass){
			var exceptActiveClass = XtrGraficoUtil.isset(exceptActiveClass) ? exceptActiveClass : false;
			var xtrTabPai = XtrQuery(id);
			if(xtrTabPai!=null){
				var xtrTabs = xtrTabPai.children('[data-xtr-tab]');
				for(var xtrTabIndex=0; xtrTabs.length > xtrTabIndex; xtrTabIndex++){
					var xtrTab = xtrTabs[xtrTabIndex];
					var target = xtrTab.target;
					if(exceptActiveClass ? !xtrTab.hasClass("active") : true){
						xtrTab.removeClass("active");
						target.hide();
					}
					else if(exceptActiveClass){
						xtrTab.onLoad();
					}
				}
			}
		}

		this.activate = activate;
		this.changeActive = changeActive;
		this.desactivateAll = desactivateAll;
		this.changeActiveAndCall = changeActiveAndCall;
		return this;	
	}
