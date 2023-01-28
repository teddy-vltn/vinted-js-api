const cookie = require("cookie");

var cookies = new Map();
var filters = new Map();

const url = "https://www.vinted.fr";
const catalogUrl = "https://www.vinted.fr/api/v2/catalog/items";

const fetchCookie = () => {
    return new Promise((resolve, reject) => {
        console.log("Fetching cookie...");

        fetch(url, {
            headers: {

            }
        }).then((response) => {
            let vintedCookies = response.headers.get('set-cookie');

            let vintedCookie = cookie.parse(vintedCookies)['secure, _vinted_fr_session'];

            if (vintedCookie) {
                console.log("Cookie successfully fetched!");
                cookies.set(url, vintedCookie);
            }
            resolve();
        }).catch(() => {
            console.log("Access denied???");
            reject();
        })
    })
}

const setFilter = (filter, value) => {
    filters.set(filter, value);
}

const convertFiltersToUrl = () => {
    return Array.from(filters.entries())
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
}

const fetchItems = (parameterUrl = "") => {
    return new Promise(async (resolve, reject) => {
        let vintedCookie = cookies.get(url);

        if (!vintedCookie) {
            console.log("Cookie hasn't been properly loaded somehow...");
            console.log("Did you forget to call fetchCookie() ?")
            console.log("Reloading cookie")

            await fetchCookie().catch(() => {});

            vintedCookie = cookies.get(url);

            if (!vintedCookie) {
                console.log("There is a problem with the cookie... Stopping")
                return resolve([]);
            }

        }

        console.log("Starting fetching of catalog");

        fetch(catalogUrl + "?" + convertFiltersToUrl(), {
            headers : {
                cookie: '_vinted_fr_session=' + vintedCookie
            }
        }).then((response) => {
            response.text().then((text) => {
                console.log("Catalog has been fetched!")
                resolve(JSON.parse(text));
            })
        })
    })
}

//setFilter("price_to", 20);
//fetchItems().then((items) => {
    //console.log(items);
//});

