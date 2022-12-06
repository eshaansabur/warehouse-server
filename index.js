const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middleware
app.use(cors())
app.use(express.json())
require('dotenv').config()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = "mongodb+srv://warehouse-admin:S8GUvsIPQ4rVWE4W@cluster0.zjcnqcs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try
    {
        await client.connect();
        console.log("DB connected");

        //Database name
        const blogCollection = client.db("warehouse").collection("blogs");
        //console.log(blogCollection);
        const productCollection = client.db("warehouse").collection("products");
        //Read Blogs
        app.get('/products', async(req, res) =>{
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })

        app.get('/blog/:blogId', async(req, res) => {
            const blogId = req.params.blogId;
            const query = {_id: ObjectId(blogId)};
            console.log(query);
            const blogs = await blogCollection.findOne(query);
            console.log(blogs);
            res.send(blogs);

        })

        app.get('/product/:fruitId', async(req, res) =>{
            const fruitId = req.params.fruitId;
            const query = {_id: ObjectId(fruitId)};
            console.log(query);
            const products = await productCollection.findOne(query);
            console.log(products);
            res.send(products);
        })
    } 
    finally
    {
      //await client.close();
    }
  }

  run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})