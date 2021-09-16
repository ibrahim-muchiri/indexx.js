const http = require('http');
const fs = require('fs');
const url = require('url');



///////////////////////////////////////
        //SERVER
        const replaceTemplate = (temp, product) =>{
            let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
            output = output.replace(/{%IMAGE%}/g, product.image);
            output = output.replace(/{%PRICE%}/g, product.price);
            output = output.replace(/{%FROM%}/g, product.from);
            output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
            output = output.replace(/{%QUANTITY%}/g, product.quantity);
            output = output.replace(/{%DESCRIPTION%}/g, product.description);
            output = output.replace(/{%ID%}/g, product.id);

            if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
            return output;
        }



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-Overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObj = JSON.parse(data);


const server = http.createServer((req, res)=> {    
const pathName = req.url;

        //OVERVIEW PAGE
if(pathName === '/' || pathName === '/Overview'){
    res.writeHead(200, {'Content-type': 'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate (tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
    
}

        //PRODUCT PAGE
else if(pathName === '/product'){
    res.end('product');
}

        //API PAGE
else if(pathName === '/api'){    
       res.writeHead(200, {'content-type': 'application/JSON'});
        res.end(data);  
    
}
        //NOT FOUND
else{
    res.writeHead(404, {
        'content-type' : 'text/html',
        'my-own-header' : 'hello-world'
    });
    res.end('error while loading the file!');
}
});
server.listen(8000, '127.0.0.1', ()=>{
    console.log("Server started at port 8000");
});
