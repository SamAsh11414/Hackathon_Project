function searchSnopes(searchString) {
    const url = 'https://www.snopes.com/?s=' +  searchString.replaceAll(" ", "+");
    return fetch(url).then(response => response.text()).then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const list = doc.querySelector('.ais-hits--item');
    });
}
