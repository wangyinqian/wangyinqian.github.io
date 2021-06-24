import {Layer} from './layer/layer.js';
import {getJson} from './get_json.js'

export class Item extends HTMLElement {
    constructor(){
        super();

        this.shadow = this.attachShadow({mode:'open'});

        this.main();
    }
    main(){
        getJson('../data/data.json').then(data => {
            const main = document.createElement('div');

            const link = document.createElement('link');

            link.rel = 'stylesheet',link.href = './css/item.css';

            main.className = 'menu-item';
            
            for(let i = 0,len = data.length;i < len;i++)
            {
                main.appendChild(this.section(data[i],i));
            }

            this.shadow.appendChild(link);
            
            this.shadow.appendChild(main);
        }) 
    }
    section(item,i){
        const section = document.createElement('section');

        section.className = 'section-cate';

        section.appendChild(this.title(item.title));

        section.appendChild(this.items(item.items,i));

        return section;
    }
    title(title){
        const div = document.createElement('div');

        div.className = 'category';
        //<button>新增</button>
        div.innerHTML = `<p id = 'cate-name'><i class="cate-icon" style="margin-right: 7px;"></i>${title}</p>`;

        //div.children[1].onclick = this.addCate.bind(this);

        return div;
    }
    items(items,i){
        const ul = document.createElement('ul');

        let listr = '';

        if(Array.isArray(items))
        {
            for(let i = 0,len = items.length;i < len; i++)
            {
                listr = listr + `<li>${this.getLiItem(items[i])}</li>`
            }
        }
        
        //listr = listr + `<li><button id = 'add-item-${i}'>新增项</button></li>`;

        ul.id = `item-list-${i}`; ul.innerHTML = listr;

        //ul.querySelector(`#add-item-${i}`).onclick = this.addItem.bind(this,i,items);

        return ul;
    }
    getLiItem({url,src,name,description = ''}){
        return `<a href = '${url}' target = '_blank'>
                    <img src='${src ?? '../image/logo.svg'}'/>
                    <article><h5>${name}</h5><p>${description}</p></article>
                </a>`
    }
    prompt(opts,event){
        const layer = document.querySelector('#layer-prompt');

        const p = document.createElement('p');

        const root = event.currentTarget.closest('.layer-open');

        const closed = root.querySelector('header i');

        p.textContent = `新增${opts.name}后就无法删除，确认新增吗？`;
        
        Layer.open({
            element:layer,title:'提示',
            area:['270px','170px'],children:p,
            ensure:event=>(closed.click(),opts.ensure(event))
        })
    }
    formItem(opts){
        const div = document.createElement('div');

        const label = document.createElement('label');

        const input = document.createElement(opts.itemName ?? 'input');

        input.id = opts.id;

        if(opts.itemName == undefined){ input.type = opts.type ?? 'text'; }

        if(opts.placeholder){ input.placeholder = opts.placeholder; } 

        label.className = 'label-title'

        label.textContent = opts.name;

        div.appendChild(label);

        div.appendChild(input);

        return div;
    }
    addCate(){
        const layer = document.querySelector('#layer-open');

        this.cateElement = this.formItem({name:'分类名称',id:'cate-name',placeholder:'请输入分类名称'});
        //
        Layer.open({
            element:layer,title:'新增分类',
            ensuredClose:false,
            area:['270px','170px'],
            children:this.cateElement,
            ensure:this.prompt.bind(this,{
                name:"分类",
                ensure:this.addedCate.bind(this)
            })
        })
    }
    addedCate(){ 
        const input = this.cateElement.querySelector("#cate-name");

        const value = input ? input.value : ''; 

        if(value)
        {
            const section = this.section({title:value,items:null});

            this.cateElement = null;

            this.shadow.children[1].appendChild(section);

            fetch(`http://47.105.150.118:8088/addCate?cate=${value}`,{
                method:'get'
            })
            .then(response => response.json())
            .then(data=>data.suc == 0 && alert("新增成功"))
        }   
     }
    addItem(i,items){
        const layer = document.querySelector('#layer-open');
        
        this.itemElement = document.createElement('div');

        this.itemElement.appendChild(this.formItem({name:'网站名称',id:'site-name',placeholder:'请输入网站名称'}));

        this.itemElement.appendChild(this.formItem({name:'网站Logo',id:'site-logo',placeholder:'请输入Logo的路径'}));

        this.itemElement.appendChild(this.formItem({name:'链接地址',id:'link-address',placeholder:'请输入网站地址'}));

        this.itemElement.appendChild(this.formItem({name:'网站描述',id:'site-description',placeholder:'请输入网站描述',itemName:'textarea'}));
        //
        Layer.open({
            element:layer,title:'新增项',
            ensuredClose:false,
            area:['350px','280px'],
            children:this.itemElement,
            ensure:this.prompt.bind(this,{
                name:"分类",
                ensure:this.addedItem.bind(this,i,items)
            })
        })
    }
    addedItem(i,items){ 
        const site = this.itemElement.querySelector('#site-name'),
              logo = this.itemElement.querySelector('#site-logo'),
              link = this.itemElement.querySelector('#link-address'),
              desc = this.itemElement.querySelector('#site-description');

        const name = site ? site.value : '',src = logo ? logo.value : '',
              url = link ? link.value : '',description = desc ? desc.value : '';

        if(name && src && url && description)
        {
            const section = this.shadow.querySelector(`.section-cate:nth-child(${i + 1})`);

            const cateName = section.querySelector('#cate-name');

            const ul = section.querySelector(`#item-list-${i}`);

            const li = document.createElement('li');

            const index = items ? items.findIndex(e=>e.name == name|| e.url == url) : -1;

            li.innerHTML = this.getLiItem({url,src,name,description});
    
            index == -1 ? ul.insertBefore(li, ul.lastChild) : ul.replaceChild(li,ul.children[index]);
    
            fetch(`http://47.105.150.118:8088/addItem?cate=${cateName.textContent
                  }&name=${name}&src=${src}&url=${url}&desc=${description}`,{
                method:'get'
            })
            .then(response=>response.json())
            .then(data=>data.suc == 0 && alert('新增成功'))
            .catch(err=>alert(err))
        }    
    }
}