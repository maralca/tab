function SideBar(id){
    var compositeDatas,compositeData;
    var compositeDataIndex;

    var p;
    var ul 
    var lis,li;
    var content;

    var titulo;
    var series,serie;
    var serieIndex;
    var serieTitulos;

    var tooltip;

    var tipo;

    var classePadraoLi;

    classePadraoLi = "xtrTab-pequeno heritage";

    compositeDatas = dataHandler.load();

    tooltip = new XtrTooltip("sidebar_tooltip","left");
       
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

            this.setAttribute("class",classePadraoLi+" active");

            compositeData = dataHandler.moveTo(compositeDataIndex).current();

            compositeDataHandler.override(compositeData);

            xtrTab.changeActiveAndCall("_xtr_tab_grafico_principal",function(){

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
        tipo = SuperModule().getDojoObject(compositeData.tipo,"tipos"); 

            
        if(XtrGraficoUtil.isset(tipo)){
            tipo = tipo.traducao.portuguesBr;                      
            series = compositeData.series;  
            content = "";
            for(serieIndex = 0; series.length > serieIndex; serieIndex++){
                serie = series[serieIndex];
                titulos = serie.titulo.replace("-"," ");
                titulo = titulos;
                titulo = XtrGraficoUtil.splitter(['Qtd de','Qtd'],titulo,1);
                
                content += "<p>"+titulo+"</p>";
            };
            content += "<b>("+tipo+")</b>";


            lis.push(li);
            p = document.createElement("p");
            p.innerHTML = "Grafico "+lis.length;                   
            li.appendChild(p);
            ul.appendChild(li);
            tooltip.addTrigger(li,{
                content: content,
                offset:{
                    y: 20
                }
            });
        }
    };
    function active(index){
        var li;

        desactiveAll();
        li = lis[index];
        li.setAttribute("class",classePadraoLi+" active");
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