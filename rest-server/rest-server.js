const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const Car = require('./src/carModel');


// Create an Express application
const app = express();
let db;
// MongoDB connection URI
const uri = 'mongodb://mongodb:27017/madMikesCars';

const testCar = new Car({
  // _id: new ObjectId("111111111100000000002222"),
  vin: "AB123456789",
  plateNumber: "TESTCAR",
  state: "AL",
  make: "Toyota",
  model: "Camry",
  year: 2020,
  ownerName: "Jim",
  ownerAddress: "100 maple st",
  dlNumber: "8001234",
  problemDescription: "broken window",
  timeInShop: 20,
  workers: ["Stan", "Lee"],
})


async function dbConnect() {
// Connect to MongoDB
  try{
    const client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');
    db = await client.db('madMikesCars');
    console.log("Connected to db")
    // const result = await db.collection('cars').insertOne(testCar);
    // console.log(result);
  }
  catch(e){
    console.log(e); 
    throw(e)
  }
}

app.use(express.json())


// Define a route handler for the root path
app.get('/cars', (req, res) => {
    db.collection('cars').find().toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    })
});

// add new car to database
app.post('/cars', (req, res) => {
  const body = req.body
  console.log("app.post req.body:", body);
  db.collection('cars').insertOne(body).then((docs) => {
    res.status(201).send({success: true});
    console.log("(response)insertOne>docs: ", docs)
  }).catch(err => {
    console.error('Failed to insert customer to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

// delete car in database
app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  console.log("delete.carId", carId)
  db.collection('cars')
    .deleteOne({ _id: new ObjectId(carId) })
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.error('Failed to delete car from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Get Specific car by ID
app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  db.collection('cars')
    .findOne({ _id: new ObjectId(carId) })
    .then((car) => {
      if (car) {
        res.json(car);
      } else {
        res.status(404).send('Car not found');
      }
    })
    .catch((err) => {
      console.error('Failed to fetch car from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});


// update car in database by id
app.put('/cars/:id', (req, res) => {
  const carId = req.params.id;
  const updates = req.body;
  console.log("app.put carId: ", carId)
  console.log("app.put body: ", updates)
  db.collection('cars')
    .updateOne({ _id: new ObjectId(carId) }, { $set: updates })
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      console.error('Failed to update car in MongoDB:', err);
      res.status(500).send('Internal Server Error');
    });
});

// Start the server on port 3000
app.listen(3000, () => {
  dbConnect().then (() => {
    console.log('Server is running on port 3000');
  });
});