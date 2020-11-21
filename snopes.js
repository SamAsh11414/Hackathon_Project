/*async function searchSnopes(searchString) {
    const url = 'https://www.snopes.com/?s=' + searchString.replaceAll(" ", "+");
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.querySelector('div.ais-hits--item');
}*/

async function getSnopesIframe(searchString) {
    const url = 'https://www.snopes.com/?s=' + searchString.replaceAll(" ", "+");
    const response = await fetch(url);
    
}
