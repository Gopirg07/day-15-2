        var pageNav = {
            data : [] ,
            per_page : 10,
            
            renderTable : function()
            {
                if(pageNav.loadData())
                {
                    pageNav.renderTemplate();
                    pageNav.renderPageNavig(pageNav.data);
                    pageNav.changePage(1);
                }
            },

            renderTemplate : function()
            {
                var th1=document.createElement("th");
                th1.innerHTML="Id";
                th1.setAttribute("scope","col");
                
                var th2=document.createElement("th")
                th2.innerHTML="Name";
                th2.setAttribute("scope","col");
                
                var th3=document.createElement("th")
                th3.innerHTML="E-Mail";
                th3.setAttribute("scope","col");
                
                var tr = document.createElement("tr");
                tr.append(th1,th2,th3);
                
                var thead=document.createElement("thead");
                thead.setAttribute("class","thead-dark");
                thead.append(tr); 
                
                var table=document.createElement("table");
                table.append(thead);
                table.setAttribute("class","table pagNav");
                    
                        
                var container=document.createElement("div");
                container.setAttribute("class","container col-xl-10");
                container.append(table);
                document.body.append(container);

                //----------------------------------------------------------------------------------------------------
            },

            renderPageNavig : function (data)
            {
                var containerp=document.createElement("div");
                containerp.setAttribute("class","container ");

                var rowp=document.createElement("div");
                rowp.setAttribute("class","row");

                var pagin=document.createElement("div");
                pagin.setAttribute("class","col-md-3  pag");

                var ul=document.createElement("ul");
                ul.setAttribute("class","pagination pagination-md");
                
                var pages = data.length % pageNav.per_page == 0 ? data.length / pageNav.per_page : (data.length / pageNav.per_page) + 1 ;
                for (var i=1 ; i<= pages ; i++)
                {
                    var li = document.createElement("li");
                    li.innerHTML = '<a class="page-link" href="#">'+i+'</a>';
                    li.setAttribute("onclick","event.preventDefault();pageNav.changePage("+i+")");
                    ul.append(li);
                }
                
                pagin.append(ul);
                rowp.append(pagin);
                containerp.append(rowp);
                document.body.append(containerp);
            },

            changePage : function(page)
            {
                var dataSize = pageNav.data.length;
                var stIndex = (page - 1) * pageNav.per_page ;
                var endIndex = page * pageNav.per_page;
                endIndex = endIndex > dataSize ? dataSize : endIndex;
                var pageData = pageNav.data.slice(stIndex,endIndex);
                this.renderTableBody(pageData);
            },

            renderTableBody : function(data)
            {
                var table = document.querySelector(".pagNav");
                var tBody = table.querySelector(".pagNavBody");
                if(tBody)
                {
                    pageNav.populateBodyTr(data,tBody);
                } else {
                    tBody = document.createElement("tbody");
                    tBody.setAttribute("class","pagNavBody");
                    pageNav.createBodyTr(data,tBody);
                    table.append(tBody);
                }
            },

            populateBodyTr : function(arr,tBody)
            {
                var len = arr.length;
                var trRows = tBody.querySelectorAll(".tRow");
                for( var i=0 ; i< len ;i++)
                {
                    var tr = trRows[i];
                    var td1=tr.querySelector(".id");
                    td1.innerHTML=arr[i].id;
                    var td2=tr.querySelector(".name");
                    td2.innerHTML=arr[i].name;
                    var td3=tr.querySelector(".email");
                    td3.innerHTML=arr[i].email;
                }
            },

            createBodyTr : function(arr,tBody)
            {
                var len = arr.length;
                for( var i=0 ; i< len ;i++)
                {
                    var td1=document.createElement("td");
                    td1.setAttribute("class","id");
                    td1.innerHTML=arr[i].id;
                    var td2=document.createElement("td");
                    td2.setAttribute("class","name");
                    td2.innerHTML=arr[i].name;
                    var td3=document.createElement("td");
                    td3.setAttribute("class","email");
                    td3.innerHTML=arr[i].email;
                    var tr = document.createElement("tr");
                    tr.setAttribute("class","tRow");
                    tr.append(td1,td2,td3);
                    tBody.append(tr);
                }
            },
            loadData : function()
            {
                if(pageNav.data.length == 0)
                {
                    var req=new XMLHttpRequest();
                    req.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
                    req.send();
                    req.onload = (req) => {
                        pageNav.data = JSON.parse(req.target.responseText);
                        console.log(pageNav.data);
                        pageNav.renderTable();
                    }
                    return false;
                }
                else{
                    return pageNav.data;
                    }
            },
            
            createTr : function(i){
                // var tr=document.createElement("tr");
    
                // var td1=document.createElement("td");
                // td1.innerHTML=res[i].id;
                // var td2=document.createElement("td");
                // td2.innerHTML=res[i].name;
                // var td3=document.createElement("td");
                // td3.innerHTML=res[i].email;
                // var tr1=document.createElement("tr");
                // return tr1.append(td1,td2,td3);
            },
            
            loadMe : function(){
                    for(i=0;i<10;i++){ 
                    var td1=document.createElement("td");
                    td1.innerHTML=res[i].id;
                    var td2=document.createElement("td");
                    td2.innerHTML=res[i].name;
                    var td3=document.createElement("td");
                    td3.innerHTML=res[i].email;
                    var tr1=document.createElement("tr");
                    return tr1.append(td1,td2,td3);
                    }
            },
        }
        //st
        pageNav.renderTable();
        
