import {setUrlFilter, fetchItems} from "./src/services/vinted.js";
import express from "express";
import twig from "twig";
import path from "path";
import { fileURLToPath } from 'url';
import {itemsToObject} from "./src/services/converter.js";
import testItems from "./src/tests/test_catalog.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'twig');

app.get('/', (req, res) => {

    //let items = itemsToObject(testItems.items);
    let items;
    setUrlFilter("catalog_ids", 2050)
    setUrlFilter("price_to", 25)
    setUrlFilter("brand_id[]", 53)
    setUrlFilter("size_ids", 206)
    setUrlFilter("search_text", "nike")
    setUrlFilter("order", "newest_first")

    fetchItems().then((response) => {
        items = response

        res.render("index.twig", {
            items: items
        })
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})