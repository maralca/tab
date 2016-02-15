function XtrTab(id,kwargs){
	var containerTab;
	var seletorTab,atributoTab,functionTab,functionAllwaysTab;
	var tabs;
	var jaChamados;

	containerTab = document.querySelector(id);
	jaChamados = {};

	atributoTab = "data-tab-id";
	functionTab = "data-tab-fn";
	functionAllwaysTab = "data-tab-allways-fn";

	if(XtrGraficoUtil.isobj(kwargs)){
		if(XtrGraficoUtil.isset(kwargs.tab)){
			atributoTab = kwargs.tab;
		}
	}
	seletorTab = "["+atributoTab+"]";
	tabs = containerTab.querySelectorAll(seletorTab);

	for(tabIndex = 0; tabs.length > tabIndex; tabIndex++){
		tab = tabs[tabIndex];
		iniciar(tab);
		if(tab.className.indexOf("ativa") >= 0){			
			chamar(tab);	
		}
		else{
			esconder(tab);
		}
	}

	this.mostrarAtivarChamar = mostrarAtivarChamar;
	this.mostrarAtivar = mostrarAtivar;
	this.liberarChamada = liberarChamada;
	this.bloquearChamada = bloquearChamada;

	return this;

	function mostrarAtivar(tab){
		ativar(tab);
		mostrar(tab);
	}

	function mostrarAtivarChamar(tab,callback){
		var tabId;

		tab = tab instanceof Node ? tab : getTab(tab);

		tabId = tab.getAttribute(atributoTab);

		esconderDesativarTodas();
		ativar(tab);
		mostrar(tab);
		if(XtrGraficoUtil.iscallable(callback)){
			callback();
		}
		else{
			chamar(tab);
		}
	}
	function getTab(value){
		var tab;

		tab = document.querySelector('['+atributoTab+'="'+value+'"]');

		return tab;
	}

	function iniciar(tab){
		tab.addEventListener("click",function(){
			esconderDesativarTodas();
			mostrar(this);
			ativar(this);
			chamar(this);
			chamarSempre(this);
		});
	}
	function esconderDesativarTodas(){
		var tabs,tab;
		var tabIndex;

		tabs = containerTab.querySelectorAll(seletorTab);

		for(tabIndex = 0; tabs.length > tabIndex; tabIndex++){
			tab = tabs[tabIndex];
			esconder(tab);
			desativar(tab);
		}
	}
	function ativar(tab){
		desativar(tab);
		tab.className += " ativa";
	}
	function desativar(tab){
		tab.className = tab.className.replace(" ativa","");
		tab.className = tab.className.replace("ativa ","");
		tab.className = tab.className.replace("ativa","");

		tab.className = tab.className.replace(" ativo","");
		tab.className = tab.className.replace("ativo ","");
		tab.className = tab.className.replace("ativo","");
	}
	function mostrar(tab){
		var alvo;

		alvo = tab.getAttribute(atributoTab);
		alvo = document.getElementById(alvo);

		alvo.className = alvo.className.replace(" tab escondida","");
		alvo.className = alvo.className.replace("tab escondida ","");
		alvo.className = alvo.className.replace("tab escondida","");
	}
	function esconder(tab){
		var alvo;

		alvo = tab.getAttribute(atributoTab);
		alvo = document.getElementById(alvo);
		mostrar(tab);
		alvo.className += "  tab escondida";
	}
	function liberarChamada(tabId){
		jaChamados[tabId] = false;
	}
	function bloquearChamada(tabId){
		jaChamados[tabId] = true;
	}
	function chamarSempre(tab){
		var callback;
		callback = tab.getAttribute(functionAllwaysTab);
		if(XtrGraficoUtil.iscallable(callback)){
			calback = eval(callback);
			calback();
		}

	}
	function chamar(tab){
		var callback;
		var tabId;
		var jaChamado;

		tabId = tab.getAttribute(atributoTab);

		jaChamado = jaChamados[tabId];
		jaChamado = XtrGraficoUtil.isset(jaChamado) ? jaChamado : false;

		if(!jaChamado){
			callback = tab.getAttribute(functionTab);
			callback = eval(callback);
			if(XtrGraficoUtil.iscallable(callback)){
				callback(tab);
			}
		}

		bloquearChamada(tabId);
	}
}