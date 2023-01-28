# vinted-js-api
A working Vinted JS API to fetch vinted catalog

---

# How to use:

To fetch vinted catalog items from their API simply use:

```js
fetchItems().then((items) => {
    //console.log(items);
    
    //your code
});
```

To set filters in your search using vinted filters: 

```js
// set max price of an item to 20
setFilter("currency", "EUR");
setFilter("price_to", 20);
