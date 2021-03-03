export const Search = {
    constructor(){
        const button = document.querySelector("#click-search");

        button.onclick = event=>this.click(event);

        document.onkeydown = event=>this.enter(event); 
    },
    click(){
        const search = document.querySelector('#search'),
              value = search.value;

        window.open(
            value 
            ? 
            `https://kaifa.baidu.com/searchPage?wd=${value.trim()}` 
            : 
            "https://kaifa.baidu.com"
        )
    },
    enter(event){ event.key == "Enter" && this.click(event); }
}