var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("you are connected at " + connection.threadId);
    displayInventory();
});
var itemID = [];
var stock = [];

var displayInventory = function () {
    connection.query("SELECT*FROM products", function (err, res) {
        if (err) throw err;
        console.log("|  ID  |  Item  |  Department  |  Price  |  Quantity  |");
        for (var i = 0; i < res.length; i++) {
            console.log("|  " + res[i].item_id + "  |  " + res[i].product_name + "  |  " + res[i].department_name + "  |  $" + res[i].price + "  |  " + res[i].stock_quantity + "  |");
            itemID.push(res[i].item_id);
            stock.push(res[i].stock_quantity)
        }
        console.log("------------------------------------------------------------")

        beginOrder();
    })
}

var beginOrder = function () {

    inquirer.prompt([
        {
            message: 'What is the Item number of the item you wish to purchase?',
            name: 'itemNum' 
        },
        {
            message: 'How many would you like to purchase?',
            name: 'quantity'
        }
     ]).then(function (answer) {
         confirmOrder(answer);     

        
        })
    }
    
    var confirmOrder = function(answer){
    connection.query("SELECT*FROM products WHERE ?",{item_id: answer.itemNum}, function(err, res) {
        if (err) throw err;
        if(res[0].stock_quantity > answer.quantity) {
                fulfillOrder(res, answer);
            } else {
                console.log("We are currently short on stock, we are working to fix this soon.  Please try ordering again.");
                beginOrder();
            } 
        })
};

var fulfillOrder = function(res, answer){
    console.log("\nYou have selected quantity: " + answer.quantity + ", item: " + res[0].product_name + ".\n")
    var newQuantity = res[0].stock_quantity - answer.quantity;
    var price = res[0].price;
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: newQuantity},{item_id: res[0].item_id}],
    function(err, res) {
        if (err) throw err;
        var bwrCost = answer.quantity * price;
        console.log("Your order has been placed successfully.  Your total is: $" + bwrCost)
    });
    connection.end();
}
