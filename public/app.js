async function ref(){
        let lat=12, lon=13; 
        var data = { lat, lon };
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        var response = await fetch('/api', options);
        var json = await response.json();
        var head=json['head'];
        var rows=json['rows'];
        var lastUpdate=json['lastUpdate'];
        console.log(head);

        var body=document.body;        
        var cnt=document.getElementById("container");
        var main_div=document.createElement("div");
        main_div.className="main";


        // while (main_div.firstChild) {
        //     main_div.removeChild(main_div.firstChild);
        // }


        var table=document.createElement("table");
        var thead=document.createElement("thead");
        var tbody=document.createElement("tbody");
        var tr=document.createElement("tr");

        head.forEach(ele=>{
            var th=document.createElement("th");
            th.textContent=ele;
            tr.appendChild(th);
        });
        rows.forEach(ele=>{
            var tr1=document.createElement("tr");
            ele.forEach(el=>{
                var td=document.createElement("td");
                td.textContent=el;
                tr1.appendChild(td);          
            })
            tbody.appendChild(tr1);
        });


        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);

        var update=document.createElement("div");
        update.className="update";
        update.textContent="Last Update:"+lastUpdate;

        main_div.appendChild(table);
        main_div.appendChild(update);
        cnt.appendChild(main_div);
        body.appendChild(cnt);
        
}
window.onload= ()=>{
    setInterval(() => {
        ref();
        var cnta=document.getElementById("container");
        console.log(cnta);
        cnta.innerHTML="";
    }, 5000);
}