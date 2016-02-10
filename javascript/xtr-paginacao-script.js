function XtrPaginacaoScript(targetId,kwargs){
	var alvo;

	var quantidade;
	var atributoPaginacao;
	var seletorPaginacao;
	var index;

	var paginadores;

	var itens,item;
	var itemIndex;

	var paginaButao;

	var paginas,pagina;
	var paginaInicial;

	var paginaAtual;

	alvo = document.getElementById(targetId);
	if(alvo == null){
		console.warn("xtrPaginacaoScript, did not find \\targetId");
		return;
	}
	alvo.className = alvo.className.replace(" xtr paginacao","");
	alvo.className = alvo.className.replace("xtr paginacao ","");
	alvo.className = alvo.className.replace("xtr paginacao","");
	alvo.className += " xtr paginacao";

	paginas = [];

	quantidade = kwargs.chunkSize || 7;
	
	paginadores = [].concat(kwargs.paginator) || [document.body];

	paginaInicial = kwargs.chunk || 0;
	
	atributoPaginacao = kwargs.attribute || "data-pagina";

	max = paginadores.length
	for(paginadorIndex = 0; max > paginadorIndex; paginadorIndex++){
		paginador = paginadores.shift();
		if(!(paginador instanceof Node)){
			paginador = document.getElementById(paginador);
		}
		paginadores.push(paginador);
	}
	delete max;

	seletorPaginacao = "["+atributoPaginacao+"]";

	itens = alvo.querySelectorAll(seletorPaginacao);

	for(itemIndex = 0; itens.length > itemIndex; itemIndex++){
		item = itens[itemIndex];
		index = item.getAttribute(atributoPaginacao);

		pagina = getPagina(index);
		paginas[pagina] = pagina;		

		if(pagina == paginaInicial){
			paginaAtual = pagina;
			mostrar(item);
		}
		else{
			esconder(item);
		}
	}

	for(paginaIndex = 0; paginas.length > paginaIndex; paginaIndex++){
		pagina = paginas[paginaIndex];
		for(paginadorIndex = 0; paginadores.length > paginadorIndex; paginadorIndex++){
			paginador = paginadores[paginadorIndex];
			paginaButao = new XtrButao({
				"content": pagina+1,
				"data-pagina": pagina,
				"onclick": function(){
					var pagina;
					var paginaClicada;

					var paginaButoes,paginaButao;
					var paginaButaoIndex;

					paginaClicada = this.getAttribute("data-pagina");						
					mudarPagina(paginaClicada);
				}
			});
			if(pagina == paginaInicial){
				paginaButao.ativar();
			}
			paginador.appendChild(paginaButao);
		}
	}

	alvo.paginar = mudarPagina;
	alvo.getPaginaAtual = getPaginaAtual;

	return alvo;

	function getPaginaAtual(){
		return paginaAtual;
	}

	function ativarPaginaButao(paginaAlvo){
		var paginaButoes;
		var paginaButao;
		var pagina;

		paginaButoes = alvo.querySelectorAll("[data-pagina]");
		for(paginaButaoIndex = 0; paginaButoes.length > paginaButaoIndex; paginaButaoIndex++){
			paginaButao = paginaButoes[paginaButaoIndex];
			pagina = paginaButao.getAttribute("data-pagina");
			if(paginaAlvo == pagina){
				paginaAtual = pagina;
				XtrButao.ativar(paginaButao);
			}
			else{
				XtrButao.desativar(paginaButao);
			}
		}
	}

	function mudarPagina(paginaAlvo){
		var item;
		var itemIndex;

		var pagina;

		ativarPaginaButao(paginaAlvo);

		for(itemIndex = 0; itens.length > itemIndex; itemIndex++){
			item = itens[itemIndex];

			pagina = item.getAttribute(atributoPaginacao);
			pagina = getPagina(pagina);			

			if(paginaAlvo == pagina){
				mostrar(item);
			}
			else{
				esconder(item);
			}
		}
	}
	function esconder(item){
		mostrar(item);
		item.className += " escondido";
	}
	function mostrar(item){
		XtrGraficoUtil.removeClass(item,"escondido");

		XtrGraficoUtil.removeClass(item,"escondida");
	}
	function getPagina(numero){
		var pagina;

		pagina = numero / quantidade;
		pagina = Math.floor(pagina);

		return pagina;
	}

}