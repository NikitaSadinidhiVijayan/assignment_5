/*global QUnit */
/*
The issue is with console.log function when trying to run Qunit test scripts on truck.js
To avoid this problem, i have created a seperate function called 'consoleprint' for
handling the console.log undefined 
This function returns the string which it supposed to print.
*/
QUnit.test('check datastore', function(assert) {
    var ds = new window.App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    //assert.equal(ds.add('m@bond.com', 'tea'), undefined);
    ds.add('james@bond.com', 'eshpressho');

    assert.deepEqual(ds.getAll(), {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'getall returns correct value');
    ds.remove('james@bond.com');
    assert.ok(ds.getAll(), 'returns value');
    assert.equal(ds.get('m@bond.com'), 'tea');
    assert.equal(ds.get('james@bond.com'), undefined);

});
QUnit.test('check truckjs', function(assert) {
    var myTruck = window.myTruck;

    assert.equal(myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    }), 'Adding order for me@goldfinger.com');
    assert.equal(myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    }), 'Adding order for dr@no.com');
    assert.equal(myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    }), 'Adding order for m@bond.com');
    var arr = myTruck.printOrders();

    assert.equal(arr[0], 'Truck #ncc-1701 has pending orders:');

    assert.equal((arr.length) - 1, 3, 'Passed- printed 3 orders');

    assert.equal(myTruck.deliverOrder('dr@no.com'), 'Delivering order for dr@no.com');
    assert.equal(myTruck.deliverOrder('m@bond.com'), 'Delivering order for m@bond.com');
    assert.deepEqual(myTruck.printOrders(), ['Truck #ncc-1701 has pending orders:', {
        'emailAddress': 'me@goldfinger.com',
        'coffee': 'double mocha'
    }]);

});
