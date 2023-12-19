const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.render("products", {
                results: data.products
            });
        }
    });
});

app.post("/save", (req, res) => {
    let newProduct = {
        name: req.body.name,
        brand: req.body.brand,
        qty: req.body.qty,
        isBought: req.body.isBought
    };
    newProduct.isBought = newProduct.isBought == null ? false : true;
    client.insert(newProduct, (err, data) => {
        if (err) throw err;
        console.log("Товар добавлен", data);
        res.redirect("/");
    });
});

app.post("/update", (req, res) => {
    const updateProduct = {
        id: req.body.id,
        name: req.body.name,
        brand: req.body.brand,
        qty: req.body.qty,
        isBought: req.body.isBought
    };
    updateProduct.isBought = updateProduct.isBought == "0" ? false : true;
    client.update(updateProduct, (err, data) => {
        if (err) throw err;
        console.log("Товар успешно обновлён", data);
        res.redirect("/");
    });
});

// app.post("/remove", (req, res) => {
//     client.remove({id: req.body.id}, (err, _) => {
//         if (err) throw err;
//         console.log("Товар удалён");
//         res.redirect("/");
//     });
// });
app.post("/remove", (req, res) => {
    client.remove({id: req.body.id}, (err, _) => {
        if (err) throw err;
        console.log(`Продукт c id=${req.body.id} удалён`);
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Сервер запущен на порту %d", PORT);
});


