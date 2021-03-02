import {Open} from './open.js';

export const Layer = {
    open(opts){
        
        if(opts.element)
        {
            const [width = '350px',height = '230px'] = opts.area || [];

            const [left = `calc((100% - ${width}) / 2)`,top = `calc((100% - ${height}) / 2)`] = opts.offset || [];

            const open = document.createElement('layer-open');

            open.style.cssText = `position:fixed;width:${width};height:${height};left:${left};top:${top};z-index:9999;`;
          
            opts.title && open.setTitle(opts.title);

            opts.children && open.setContent(opts.children);

            if(opts.ensure)
            {
                if(opts.ensuredClose != undefined)
                { 
                    open.ensuredClose = opts.ensuredClose; 
                } 

                open.ensure = opts.ensure; 
            }

            if(opts.cancel){ open.cancel = opts.cancel; }

            opts.element.appendChild(open);

            const time = setTimeout(()=>(open.className = 'opacity',clearTimeout(time)),0);
        }
    }
}

customElements.define('layer-open',Open);