import {config} from "../config/config.js";
import {itemsToObject} from "./converter.js";

const webhook_url = config.DISCORD_WEBHOOK;

const discordFetch = (body) => {
    fetch(webhook_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
}

export const discordSendItem = (item) => {
    const body = JSON.stringify({
        username: config.DISCORD_WEBHOOK_NAME,
        embeds: [
            {
                color: 11730954,
                author: {
                    name: 'Vinted.fr',
                    url: item.url,
                    icon_url: 'https://static.vinted.com/assets/favicon/default/apple-touch-icon-304950b8dc9146734ffe4fee1d5837f698492a61a5b562369eb32e212a3ea306.png',
                },

                title: item.name,

                description: item.price + "EUR",

                fields: [
                    {
                        name: 'Marque',
                        value: item.brand
                    }
                ],

                image: {
                    url: item.thumbnails
                },
            }
        ]
    })

    discordFetch(body);
}
