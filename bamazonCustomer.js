var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,

    // Your username
    user: "hzy84hc0otyebr9f",

    // Your password
    password: "grc2b1ctzuhd0m4i",
    database: "e0tages3w51q6u2m"
});

connection.connect(function(err, data) {
    if (err) throw err;
    listOfProducts()

});

function listOfProducts() {
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(" ")
            console.log("ID#:" + res[i].item_id)
            console.log("Product Name: " + res[i].product_name)
            console.log("Department Name: " + res[i].department_name)
            console.log("Price: $" + res[i].price)
            console.log(" ")
            console.log("==========================================")

        }
        chooseProduct()
    });

}

function chooseProduct() {
    inquirer
        .prompt({
            name: "product",
            type: "input",
            message: "Enter the ID# of the product you would like to purchase",
        })

    .then(function(answer) {
        var query = "SELECT product_name FROM products WHERE?";
        connection.query(query, { item_id: answer.product }, function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Product Name: " + res[i].product_name)
            }
            // quantityOfProducts();
        })

    })
}
