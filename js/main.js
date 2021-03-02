
import {Item} from './item.js';
import {Search} from './search.js';

function main(){
   customElements.define('menu-item',Item);

   Search.constructor();
}

main();