import {setUrlFilter, fetchItems} from "./src/services/vinted.js";
import {discordSendItem} from "./src/services/webhook.js";

fetchItems().then((response) => {
    let item = response[3]

    discordSendItem(item)
})

