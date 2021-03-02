class Server {
    constructor(){
        this.create();
    }
    create(){
        const http = require('http');

        const server = http.createServer((req,res)=>{
            const url = new URL(req.url,`http://${req.headers.host}`);

            res.setHeader('Access-Control-Allow-Origin',"http://dev.qdetong.com");
            
            const methodName = url.pathname.substring(1);

            this[methodName](url.searchParams).then(() => res.end('{"suc":0}','utf8')).catch(err=>console.log(err))
        })

        server.listen(8088);
    }
    addCate(search){
        const value = search.get('cate');

        return this.file(data => {
            const index = data.findIndex(e=>e.title == value);

            index == -1 ? data.push({title:value}) : data.splice(index,1,{title:value})
        });  
    }
    removeCate(search){
        const index = search.get('index');

        return this.file(data => data.splice(index,1)); 
    }
    addItem(search){
      
        return this.file(data => {
            const cate = search.get('cate');

            const value = {name:search.get('name'),src:search.get('src'),url:search.get('url'),description:search.get('desc')};

            const item = data.find(e => e.title == cate);

            if(item.items)
            {
                let index = item.items.findIndex(e=>e.name == value.name || e.url == value.url)
                
                index != -1 ? item.items.splice(index,1,value) : item.items.push(value)
            }
            else{ item.items = [value]; }
        })
    }
    removeItem(search){

        return this.file(data => {
            const cate = search.get('cate');

            const index = search.get('index');

            const item = data.find(e => e.title == cate);

            item.items.splice(index,1);
        })
    }
    file(callback){
        const file = require('fs');

        return new Promise((resolve,reject)=>{
            file.readFile('../data/data.json','utf8',(err,data)=>{
                if(err == null)
                { 
                    let content = JSON.parse(data);
    
                    callback && callback(content);
                    
                    file.writeFile(
                        '../data/data.json',
                        JSON.stringify(content),
                        err=>err == null ? resolve() : reject(err)
                    )
                }
                else{ reject(err); } 
            })
        })  
    }

}

new Server();