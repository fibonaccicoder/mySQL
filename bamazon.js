var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Abundance1",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    startApp();
    // readProducts();
});


function startApp() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        inquirer.prompt([{
                name: "productID",
                message: "What is the ID of the product you would like to buy?",
                type: "list",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
            },
            {
                name: "unitsDesired",
                message: "How many units of this product would you like?",
                type: "input"

            },

        ]).then(function (answer) {
            var chosenItem = answer.productID;
            console.log(chosenItem);
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_name === answer.choice) {
                    chosenItem = results[i];
                };
            }

        });
    })
}


// function readProducts() {
//     connection.query("SELECT * FROM products", function (error, response) {
//         if (error) throw error;
//         // console.log(response);
//         connection.end();
//     });
// }