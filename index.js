const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



// automotive-brand-shop
// nWh1pQayeJuDnUGg





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i9zoefc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const carCollection = client.db('carDB').collection('car');

    app.get('/car', async (req, res) => {
      const cursor = carCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

  app.get('/car/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await carCollection.findOne(query);
    res.send(result);
})

app.get('/https://automotive-brand-shop-serverside-4h7p7nxyj.vercel.app/getCart', async (req, res) => {
  try {
    const cartCollection = client.db('carDB').collection('cart');
    const cartItems = await cartCollection.find().toArray();
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart items' });
  }
});




    app.post('/car', async (req, res) => {
        const newCar = req.body;
        console.log(newCar);
        const result = await carCollection.insertOne(newCar);
        res.send(result);
    });

    app.post('/car/myCart', async (req, res) => {
      const newCar = req.body;
      console.log(newCar);
      const result = await carCollection.insertOne(newCar);
      res.send(result);
  })


  app.put('/car/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updatedCar = req.body;

    const car = {
        $set: {
            name: updatedCar.name,
            brandName: updatedCar.brandName,
            price: updatedCar.price,
            rating: updatedCar.rating,
            type: updatedCar.type,
          
            photo: updatedCar.photo,
        }
    }

    const result = await carCollection.updateOne(filter, car, options);
    res.send(result);
})





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('car brand shop server is running')
})



app.listen(port,()=>{
    console.log(`car brand shop is running on port:${port}`);
})