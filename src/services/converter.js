const {fetchItems} = require("../services/vinted");

const itemsToObject = (items) => {
    let converted = Array()

    for (let itemsKey in items) {
        let item = items[itemsKey]

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

    return converted
}

module.exports = {
    itemsToObject
}