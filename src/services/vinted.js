
import cookie from "cookie";

import {config} from "../config/config.js";
import {convertFiltersToUrl} from "../utils/urlFormat.js";
import {itemsToObject} from "./converter.js";

let cookies = new Map();
let filters = new Map();

const fetchCookie = () => {
    return new Promise((resolve, reject) => {
        console.log("Fetching cookie...");

        fetch(config.URL).then((response) => {
            let vintedCookies = response.headers.get('set-cookie');

            let vintedCookie = cookie.parse(vintedCookies)['secure, _vinted_fr_session'];

            if (vintedCookie) {
                console.log("Cookie successfully fetched!");
                cookies.set(config.URL, vintedCookie);
            }
            resolve();
        }).catch((reason) => {
            console.log("Access denied??? " + reason);
            reject();
        })
    })
}

export const setUrlFilter = (filter, value) => {
    filters.set(filter, value);
}

export const fetchItems = () => {
    return new Promise(async (resolve, reject) => {
        let vintedCookie = cookies.get(config.URL);

        if (!vintedCookie) {
            console.log("Cookie hasn't been properly loaded somehow...");

            await fetchCookie().catch(() => {});

            vintedCookie = cookies.get(config.URL);

            if (!vintedCookie) {
                console.log("There is a problem with the cookie... Stopping")
                return resolve([]);
            }

        }

        console.log("Starting fetching of catalog");

        fetch(config.CATALOG_URL + "?" + convertFiltersToUrl(filters), {
            headers : {
                "cookie": '_vinted_fr_session=' + vintedCookie,
            }
        }).then((response) => {
            response.text().then((text) => {
                console.log("Catalog has been fetched!")

                let jsonItems = JSON.parse(text).items

                let items = itemsToObject(jsonItems)

                resolve(items);
            })
        })
    })
}
