export class Open extends HTMLElement {
    constructor(){
        super();
        
        this.shadow = this.attachShadow({mode:'open'});

        this.main();
    }
    main(){
        const link = document.createElement('link');

        link.rel = 'stylesheet';

        link.href = './css/open.css';
        
        this.shadow.appendChild(link);

        this.shadow.appendChild(this.section()); 
    }
    section(){
        const section = document.createElement('section');

        section.className = 'layer-open';

        section.appendChild(this.head());

        section.appendChild(this.content());

        section.appendChild(this.footer());

        return section;
    }
    head(){
        const header = document.createElement('header');

        header.innerHTML = `<h4>${this.title}</h4><i><img src = 'image/close.svg'></i>`;

        header.children[1].onclick = this.close.bind(this);

        return header;
    }
    content(){
        const main = document.createElement('main');

        return main;
    }
    footer(){
        const footer  = document.createElement('footer');

        let childstr = '<button id = "layer-ensure">确定</button>';

        childstr = childstr + '<button id = "layer-cancel">取消</button>'

        footer.innerHTML = childstr;
        
        footer.children[0].onclick = this.ensureHandler.bind(this);

        footer.children[1].onclick = this.cancelHandler.bind(this);

        return footer;
    }
    cancelHandler(event){
        this.cancel && this.cancel(event);

        this.close();
    }
    ensureHandler(event){
        this.ensure && this.ensure(event);

        this.ensuredClose != false && this.close();
    }
    close(){
        const parent = this.shadow.host.parentNode;

        parent 
        && 
        parent.removeChild(this.shadow.host);
    }
    setTitle(title){
        const h4 = this.shadow.querySelector('header h4');
        
        h4.textContent = title;
    }
    setContent(content){
        const main = this.shadow.querySelector('main');

        if(typeof content == 'string')
        {
            main.innerHTML = content;
        }
        else
        {
            main.appendChild(content);
        }
    }
}