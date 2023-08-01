const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

// Sample function to get random price and delivery date
function getRandomPrice() {
  return Math.floor(Math.random() * 100) + 10; // Generate random price between 10 and 100
}

function getRandomDeliveryDate() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 10) + 1); // Add random days (1 to 10) to current date
  return deliveryDate.toISOString();
}

var myService = {
  MyService: {
    MyPort: {
      SSNLookup: function(args) {
        return {
          ssn: '123-456-7890'
        };
      },

      // This is how to define an asynchronous function with a callback.
      MyAsyncFunction: function(args, callback) {
        // do some work
        callback({
          name: args.name
        });
      },

      // This is how to define an asynchronous function with a Promise.
      MyPromiseFunction: function(args) {
        return new Promise((resolve) => {
          // do some work
          resolve({
            name: args.name
          });
        });
      },

      // This is how to receive incoming headers
      HeadersAwareFunction: function(args, cb, headers) {
        return {
          name: headers.Token
        };
      },

      // You can also inspect the original `req`
      reallyDetailedFunction: function(args, cb, headers, req) {
        console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
        return {
          name: headers.Token
        };
      },

      // New operation to get part information
      GetPartInfo: function(args) {
        const partNumber = args.partNumber;
        const price = getRandomPrice();
        const deliveryDate = getRandomDeliveryDate();

        // Convert the SOAP response to JSON
        return {
          partNumber: partNumber,
          price: price,
          deliveryDate: deliveryDate,
        };
      },
    }
  }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8000, function(){
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  const server = soap.listen(app, '/GetPartInfo', myService, xml, function(){
    console.log('soap server initialized');
  });
  server.log = (type, data) => {
    console.log(`Got something ${type} ${data}`);
  }
});