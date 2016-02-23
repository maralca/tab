function SideBar(id,kwargs){
    var compositeDatas,compositeData;
    var compositeDataIndex;

    var p;
    var ul 
    var lis,li;
    var content;

    var titulos,titulo;
    var series,serie;
    var serieIndex;
    var serieTitulos;

    var tooltip;

    var allwaysfn;

    var tipo;
    var nomeTipo;

    var classePadraoLi;

    classePadraoLi = "xtr tab herenca";

    compositeDatas = dataHandler.load();

    allwaysfn = function(){};

    if(XtrGraficoUtil.isobj(kwargs)){
        allwaysfn = kwargs["allways-fn"] || kwargs.allwaysfn || function(){};
        adapterfn = kwargs['adapter-fn'] || kwargs.adapterfn || function(){};
    }

    tooltip = new XtrTooltip("SIDEBAR_tooltip","esquerda");
       
    ul = document.createElement("ul");
    document.querySelector("#SIDEBAR").appendChild(ul);
    lis = [];
    for(compositeDataIndex = 0; compositeDatas.length > compositeDataIndex; compositeDataIndex++){

        serieTitulos = [];

        li = document.createElement("li");
        li.setAttribute("id","sideBar_"+compositeDataIndex);
        li.setAttribute("data-compositeData-index",compositeDataIndex);
        li.setAttribute("class",classePadraoLi);

        li.addEventListener("click",function(){
            var li;
            var liIndex;

            var elements,element;
            var elementIndex;

            for(liIndex = 0; lis.length > liIndex; liIndex++){
                li = lis[liIndex];
                li.setAttribute("class",classePadraoLi);
            }
            compositeDataIndex = this.getAttribute("data-compositeData-index");

            this.setAttribute("class",classePadraoLi+" ativa");

            compositeData = dataHandler.moveTo(compositeDataIndex).current();
            adapterfn(compositeData);

            compositeDataHandler.override(compositeData);

            xtrTab.mostrarAtivarChamar("tab_exibir",function(){

                allwaysfn();
                generateWithLoading(compositeData);

            },false);

            elements = document.getElementById(xtrGrafico.ID_LEGENDA).querySelectorAll(".xtrCheckboxElement[data-legenda]");
           
            for(elementIndex = 0; elements.length > elementIndex; elementIndex++){
                element = elements[elementIndex];
                element.setAttribute("checked",true);
                element.firstChild.setAttribute("checked",true);
            };
        });

        compositeData = compositeDatas[compositeDataIndex];

        tipo = new SuperModule(); 

        tipo = tipo.getDojoObject(compositeData.tipo,"tipos"); 


        if(!XtrGraficoUtil.isset(tipo)){
            continue;
        }  
        nomeTipo = tipo.traducao.portuguesBr;
        tipo = tipo.variavel;

        series = compositeData.series;
        content = "<div class='flexbox column-reverse'>";
        for(serieIndex = 0; series.length > serieIndex; serieIndex++){
            serie = series[serieIndex];
            titulos = serie.titulo.replace("-"," ");
            titulo = titulos;
            titulo = XtrGraficoUtil.splitter(['Qtd de','Qtd'],titulo,1);
            
            content += "<p>"+titulo+"</p>";
        };
        content += "</div>";
        
        content += "<b>("+nomeTipo+")</b>";

        var chars ='abcdefghijklmnopqrstuvwxyz';

        lis.push(li);
        p = document.createElement("p");

        var n = lis.length.toString();
        var ii;
        var x = '';
        for(var i = 0; n.length > i; i++){
            ii = n[i];
            ii = parseInt(ii) - 1;
            x += chars[ii].toUpperCase();
        }

        p.innerHTML = "<span class='xtr label'>"
            +"<span>"+x+"</span>"
        +"</span>"
        +ICONES_TIPOS[tipo];  


        li.appendChild(p);
        
        ul.appendChild(li);

        tooltip.addTrigger(li,{
            content: content
        });

        //location.href = location.href.replace("#middle","") + "#middle";
    };
    function active(index){
        var li;

        desactiveAll();
        li = lis[index];
        li.setAttribute("class",classePadraoLi+" ativa");
    }
    function desactiveAll(){
        var li;
        var liIndex;
        for(liIndex = 0; lis.length > liIndex; liIndex++){
            li = lis[liIndex];
            li.setAttribute("class",classePadraoLi);
        };
    }

    this.active = active;
    this.desactiveAll = desactiveAll;
    this._ = ul;

    return this;
}