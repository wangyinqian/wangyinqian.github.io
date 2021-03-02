export const Search = {
    constructor(){
        const button = document.querySelector("#click-search");

        button.onclick = event=>this.click(event);

        document.onkeydown = event=>this.enter(event); 
    },
    click(){
        const search = document.querySelector('#search');

        window.open(`https://kaifa.baidu.com/searchPage?wd=${search.value.trim()}`)
    },
    enter(event){ event.key == "Enter" && this.click(event); }
}