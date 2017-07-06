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
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Enter the ID# of the product you would like to purchase"
            },

            {
                name: "quantity",
                type: "input",
                message: "Enter how many would you like to purchase?"

            }
        ])



    .then(function(answer) {
            var query = "SELECT product_name FROM products WHERE?";
            connection.query(query, { item_id: answer.product }, function(err, res) {
                    for (var i = 0; i < res.length; i++) {
                        var productSelected = res[i].product_name
                        var stockQ = parseInt(productSelected.stock_quantity)
                        console.log("Product Name: " + productSelected)
                        console.log("quantity:" + stockQ)
                    } //end of for loop

                }) //end of connection.query

            // var quan = "SELECT stock_quantity FROM products WHERE?";
            // connection.query(quan, {item_id: productSelected}, function(err,res) {
            //     console.log(this)
            // })

        }) //end of .then


} //end of chooseProduct

//----------

//     function productQuantity() {
//     inquirer
//         .prompt({
//             name: "quantity",
//             type: "input",
//             message: "Enter how many would you like to purchase?"
//         })

//     .then(function(answer) {
//             var query = "SELECT stock_quantity FROM products WHERE?";
//             connection.query(query, {stock_quantity: productSelected}, function(err, res) {
//                 console.log("Quantity: " + res[i].stock_quantity)

//             })//end of connection.query
//         })//end if .then

// } //end of productQuantity function

// //----------
