// TODO test all this code

// TODO Make sure that this function works 
// function inIframe(url, onLoad) {
//     const iframe = document.createElement('iframe');
//     iframe.setAttribute('src', url);
//     iframe.style.width = '0';
//     iframe.style.height = '0';
//     document.body.appendChild(iframe);
//     return new Promise((resolve, reject) => {
//         iframe.contentWindow.addEventListener('load', () => {
//             console.info('loaded')
//             setTimeout(() => {
//                 const result = onLoad(iframe);
//                 iframe.remove();
//                 resolve(result);
//             }, 2000);
//         });
//     });
// }

// function searchSnopes(searchString) {
//     const url = 'https://www.snopes.com/?s=' + searchString.replaceAll(' ', '+');
//     return inIframe(url, iframe => iframe.contentDocument.querySelector('div.ais-hits--item'));
// }

// function getTrueFalseValue(searchString) {
//     const url = 'https://www.sonpes.com/?s=' + searchString.replaceAll(' ', '+');
//     const topResultLink = inIframe(url, iframe => iframe.contentDocument.querySelector('.search-entry links').href);
//     console.log(topResultLink);
//     return inIframe(topResultLink, iframe => {
//         const doc = iframe.contentDocument;
//         if(doc.querySelector('.rating-label-true'                 )) return 'true';
//         if(doc.querySelector('.rating-label-mostly-true'          )) return 'mostly-true';
//         if(doc.querySelector('.rating-label-mixture'              )) return 'mixture';
//         if(doc.querySelector('.rating-label-mostly-false'         )) return 'mostly-false';
//         if(doc.querySelector('.rating-label-false'                )) return 'false';
//         if(doc.querySelector('.rating-label-unproven'             )) return 'unproven';
//         if(doc.querySelector('.rating-label-outdated'             )) return 'outdated';
//         if(doc.querySelector('.rating-label-miscaptioned'         )) return 'miscaptioned';
//         if(doc.querySelector('.rating-label-correct-attribution'  )) return 'correct-attribution';
//         if(doc.querySelector('.rating-label-misattributed'        )) return 'misattributed';
//         if(doc.querySelector('.rating-label-scam'                 )) return 'scam';
//         if(doc.querySelector('.rating-label-ledgend'              )) return 'legend';
//         if(doc.querySelector('.rating-label-labeled-satire'       )) return 'labeled-satire';
//         if(doc.querySelector('.raitng-label-lost-ledgend'         )) return 'lost-ledgend';
        
//         return null;
//     });
// }

//TODO: Make old code worky

const url = "https://yfrdx308zd-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia for vanilla JavaScript (lite) 3.21.1;instantsearch.js 1.11.15;JS Helper 2.19.0&x-algolia-application-id=YFRDX308ZD&x-algolia-api-key=7da15c5275374261c3a4bdab2ce5d321"
function searchSnopes(searchString) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: `{"requests":[{"indexName":"wp_live_searchable_posts","params":"query=${searchString}&hitsPerPage=10&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facetingAfterDistinct=true&facets=%5B%22taxonomies_hierarchical.category.lvl0%22%2C%22post_author.display_name%22%2C%22post_date%22%5D&tagFilters="}]}`
    })
    .then(res => res.json())
    .then(json => json => json.results[0].hits[0]);
}

async function getTrueFalseValue(searchString) {
    const searchResult = await searchSnopes(searchString);
    const ratings = searchResult.taxonomies.fact_check_rating;
    console.log(ratings);
    return ratings[0];
}
