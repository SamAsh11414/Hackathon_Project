// TODO test all this code

// TODO Make sure that this function works 
function inIframe(url, onLoad) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.style.width = '0';
    iframe.style.height = '0';
    document.body.appendChild(iframe);
    return new Promise((resolve, reject) => {
        iframe.contentWindow.addEventListener('load', () => {
            setTimeout(() => {
                const result = onLoad(iframe);
                iframe.remove();
                resolve(result);
            }, 2000);
        });
    });
}

function searchSnopes(searchString) {
    const url = 'https://www.snopes.com/?s=' + searchString.replaceAll(' ', '+');
    return inIframe(url, iframe => iframe.contentDocument.querySelector('div.ais-hits--item'));
}

// TODO : Return all types of rating
function getTrueFalseValue(searchString) {
    const url = 'https://www.sonpes.com/?s=' + searchString.replaceAll(' ', '+');
    const topResultLink = inIframe(url, iframe => iframe.contentDocument.querySelector('.search-entry links').href);
    return inIframe(topResultLink, iframe => {
        const doc = iframe.contentDocument;
        if(doc.querySelector('.rating-label-true'))         return 'true';
        if(doc.querySelector('.rating-label-mostly-true'))  return 'mostly-true';
        if(doc.querySelector('.rating-label-mixture'))      return 'mixture';
        if(doc.querySelector('.rating-label-mostly-false')) return 'mostly-false';
        if(doc.querySelector('.rating-label-false'))        return 'false';
        if(doc.querySelector('.rating-label-unproven'))     return 'unproven';
        if(doc.querySelector('.rating-label-outdated'))     return 'outdated';
        return null;
    });
}