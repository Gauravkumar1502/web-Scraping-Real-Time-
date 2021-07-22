const express = require('express');
const fetch = require('isomorphic-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const allData = [];

async function getData(){
    const response = await fetch('https://in.finance.yahoo.com/most-active?offset=0&count=5');
    const text = await response.text();
    const dom = await new JSDOM(text);

    const tableRows=dom.window.document.querySelectorAll('tr');
    const rowCount=tableRows.length;

    const tableData=[];
    flag='th';
    for(var i=0;i<rowCount;i++)
    {
        if(i>0) flag='td';
        var tableCells=tableRows[i].querySelectorAll(flag);
        var cellCount=tableCells.length;

        var cells=[];
        for(var j=1;j<8;j++)
        {
            cells.push(tableCells[j].textContent);
        }
        tableData.push(cells);
    }

    allData.push(tableData[0]);
    allData.push(tableData.splice(1));

    return tableData;
}

getData(); 

app.post('/api', (request, response) => {    
    response.json({
        head:allData[0],
        rows:allData[1],
        lastUpdate:new Date().toLocaleString()
    });
});    

