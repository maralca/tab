	function XtrPaginacaoScript(objInitialize){
		

		var xtrPaginacaoPai;
		var xtrPaginacaoSelector = '[data-xtr-pagina-target]';
		var xtrPaginacaoAtributo = 'data-xtr-pagina-target';
		var xtrPaginacaoChunck = 10;
		var xtrPageShowing;

		document.addEventListener("DOMContentLoaded",function(event){
			xtrPaginacaoHidePagesExcept(0);
		});

		if(XtrGraficoUtil.isobj(objInitialize)){
			if(XtrGraficoUtil.isset(objInitialize.containerSelector)){
				var innerContainerSelector = objInitialize.containerSelector;
				xtrPaginacaoContainerSelector(innerContainerSelector);
			}
			if(XtrGraficoUtil.isset(objInitialize.elementAttribute)){
				var innerElementattribute = objInitialize.elementAttribute;
	       		setXtrPaginacaoElementsAttribute(innerElementattribute);
			}
			if(XtrGraficoUtil.isset(objInitialize.chunkSize)){
				var innerChunkSize = objInitialize.chunkSize;
				setXtrPaginacaoChunckSize(innerChunkSize); 
			}
			if(XtrGraficoUtil.isset(objInitialize.paginator)){
				if(!XtrGraficoUtil.isarray(objInitialize.paginator))
					objInitialize.paginator = new Array(objInitialize.paginator);

				for (var paginatorIndex = 0; paginatorIndex < objInitialize.paginator.length; paginatorIndex++) {
					var paginator = objInitialize.paginator[paginatorIndex];
					xtrPaginacaoMenu(paginator);
				};
			}			
			if(XtrGraficoUtil.isset(objInitialize.chunckNumber)){
				var innnerChunckNumber = objInitialize.chunckNumber;
				xtrPaginacaoHidePagesExcept(innnerChunckNumber);
			} 
	    }
		function xtrPaginacaoContainerSelector(selector){
			var x = selector;
			xtrPaginacaoPai = XtrQuery(x);
		}
		function setXtrPaginacaoElementsAttribute(selectorPagina){
			xtrPaginacaoSelector='['+selectorPagina+']';
			xtrPaginacaoAtributo=selectorPagina
		}
		function setXtrPaginacaoChunckSize(chunckNumber){
			xtrPaginacaoChunck = chunckNumber;
		}
		function xtrPaginacaoAtivarButao(){
			xtrButoesPaginacao = xtrPaginacaoPai.children('[data-xtr-pagina]');
			for(var xtrButaoPaginacaoIndex = 0; xtrButoesPaginacao.length > xtrButaoPaginacaoIndex; xtrButaoPaginacaoIndex++){
				var xtrButaoPaginacao = xtrButoesPaginacao[xtrButaoPaginacaoIndex];
				var xtrButaoPaginacaoNumero = xtrButaoPaginacao.data("xtr-pagina");
				if(xtrPageShowing == xtrButaoPaginacaoNumero)
					xtrButaoPaginacao.addClass("active");
				else
					xtrButaoPaginacao.removeClass("active");
			}
		}
		function xtrPaginacaoHidePagesOnRange(ExceptChunckNumber,start,end){
			var xtrPages = xtrPaginacaoPai.children(xtrPaginacaoSelector);
			xtrPageShowing = ExceptChunckNumber;
			for(var xtrPageIndex = start; xtrPages.length > xtrPageIndex && (XtrGraficoUtil.isset(end) ?  end > xtrPageIndex : true); xtrPageIndex++){
				var xtrPage = xtrPages[xtrPageIndex];
				var pageNumber = xtrPage.element.getAttribute(xtrPaginacaoAtributo);
				if(parseInt(pageNumber / xtrPaginacaoChunck) != ExceptChunckNumber){
					xtrPage.hide();
				}
				else{
					xtrPage.show();			
				}
			}		
			xtrPaginacaoAtivarButao();
		}
		function xtrPaginacaoHidePagesExcept(exceptChunckNumber){
			var ExceptChunckNumber = XtrGraficoUtil.isset(exceptChunckNumber) ? exceptChunckNumber : 1;		
			if(xtrPaginacaoPai!=null){			
				xtrPaginacaoHidePagesOnRange(ExceptChunckNumber,0);
			}
		}
		function xtrPaginacaoMenu(where){
			var xtrWhere = XtrQuery(where);
			var xtrPages = xtrPaginacaoPai.children(xtrPaginacaoSelector);
			var col = -1;
			var nCols = -1;
			var pageNumber = 1;
			var dif = true;

			for (var i = 0; i < xtrPages.length; i++) {
				var xtrPage = xtrPages[i];
				var thisCol = xtrPage.data('colunaIndex');

				var nextXtrPage = xtrPages[i+1];
				if(XtrGraficoUtil.isset(nextXtrPage)){
					var nextCol = nextXtrPage.data('colunaIndex');
				}
				else{				
					var nextCol=-1;
				}
				var dif = thisCol > col;
				var lastInPage = thisCol/pageNumber == chunkSize;
				var lastItem = nextCol == -1;
				
				col = thisCol;

				if(lastInPage || lastItem){
					nCols = thisCol+1;
					var onlyOnePage = chunkSize >= nCols;
					if(!onlyOnePage){	
						var content = document.createTextNode(pageNumber);
						var div = document.createElement('div');
						div.setAttribute('data-xtr-pagina',pageNumber-1);
						div.className = 'xtrButao xtrButao-default'
						div.addEventListener('click',function(event){
							var thisXtrPage = new XtrElement(this);
							var thisPageNumber = thisXtrPage.data('xtr-pagina');
							xtrPaginacaoHidePagesExcept(thisPageNumber);
						});
						div.appendChild(content);
						xtrWhere.element.appendChild(div);
					}
					pageNumber++;
				}	
			};
		}
	}