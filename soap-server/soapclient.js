// not working

const soap = require('soap');
const url = 'http://localhost:8000/GetPartInfo?wsdl';


function getCustomer(xml) {
  return new Promise ((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(client.describe());
      client.MyService.MyPort.SSNLookup(xml, function(err, result, rawResponse, soapHeader, rawRequest) {
        console.log('SOAP: ', result);
        return resolve(result)
      })
    });
  });
}

const getCustomerInfo =  async(customer) => {
  try {
    console.log(customer);
    const info = await getCustomer(customer);
    return info;
  } catch (error) {
    return error;
  }
}

function getPartInfo(partNumber) {
  return new Promise((resolve, reject) => {
    soap.createClient(url, function (err, client) {
      if (err) {
        console.log(err);
        return reject(err);
      }

      const args = { partNumber: partNumber };
      client.MyService.MyPort.GetPartInfo(args, function (err, result, rawResponse, soapHeader, rawRequest) {
        if (err) {
          console.log('Error:', err);
          return reject(err);
        }

        console.log('SOAP Result:', result);
        return resolve(result);
      });
    });
  });
}

// Usage example:
const partNumber = '123654'; // Replace with the desired part number
getPartInfo(partNumber)
  .then((response) => {
    console.log('JSON Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = getCustomerInfo;