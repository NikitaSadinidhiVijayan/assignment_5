(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

// to handle console.log function
    function consoleprint(str) {
        console.log(str);
        return str;
    }

    Truck.prototype.createOrder = function(order) {
        // modified for testing
        var res1 = consoleprint('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
        return res1;
    };
    Truck.prototype.deliverOrder = function(customerId) {
        var res2 = consoleprint('Delivering order for ' + customerId);
        this.db.remove(customerId);
        return res2;
    };
    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());
        var out_arr = [];
        var res3 = consoleprint('Truck #' + this.truckId + ' has pending orders:');
        out_arr.push(res3);
        customerIdArray.forEach(function(id) {
            res3 = consoleprint(this.db.get(id));
            out_arr.push(res3);

        }.bind(this));
        return out_arr; //for testing purpose
    };
    App.Truck = Truck;
    window.App = App;

})(window);
