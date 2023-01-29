const {fetchItems} = require("../services/vinted");

const data = require("./test_catalog.json");
const items = data.items

let converted = Array()

for (let itemsKey in items) {
    let item = items[itemsKey]
    console.log(item)

    let Item = {
        name: item.title,
        brand: item.brand_title,
        price: item.price,
        discount: item.discount,
        favorite_count: item.favourite_count,
        view_count: item.view_count,
        url: item.url,
        thumbnails: item.photo.url
    }

    converted.push(Item)
}

console.log(converted)