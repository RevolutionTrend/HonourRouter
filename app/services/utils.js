import { HTTPURL } from '../../app.config';

const getUrlAndBody = (method, url, data) => {
    let obj = {
        url: HTTPURL + '/' + url,
        body: ''
    };
    if (data && typeof data === 'object') {
        if (method.toUpperCase() === 'GET') {
            let arr = [];
            for (let key in data) {
                arr.push(key + '=' + encodeURIComponent(data[key]));
            }
            obj.url = obj.url + '?' + arr.join('&');
        } else {
            obj.body = JSON.stringify(data);
        }
    }
    return obj;
}

// let fetchThrottle = false;
export function fetchData(method = 'POST', url, data) {
    // if (fetchThrottle) {
    //     return;
    // }
    // fetchDataThrottle = true;
    // setTimeout(function () {
    //     fetchThrottle = false;
    // }, 500);
    const urlAndBody = getUrlAndBody(method, url, data);
    return window.fetch(urlAndBody.url, {
        body: urlAndBody.body,
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

let routeName = '#';
export function setRouteName(name) {
    routeName = name;
}

export function getRouteName() {
    return routeName;
}