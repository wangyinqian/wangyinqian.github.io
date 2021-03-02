export function getJson(path){
    return fetch(path,{method:'get'})
           .then(response => response.json())
}