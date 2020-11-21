function searchSnopes(searchString) {
    const url = 'https://www.snopes.com/?s=' + searchString.replaceAll(" ", "+");
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.style.width = "0";
    iframe.style.height = "0";
    document.body.appendChild(iframe);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const searchResult = iframe.contentDocument.querySelector('div.ais-hits--item');
            iframe.remove();
            resolve(searchResult);
        }, 2000);
    });
}