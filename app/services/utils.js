import { HTTPURL } from '../../app.config';

export function fetchData(method = 'POST', url, data) {
    const finalUrl = HTTPURL + '/' + url;
    return window.fetch(finalUrl, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'content-type': 'application/json'
        },
        method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    }).then(res => res.json())
        .catch(error => console.error(error));
}