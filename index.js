const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/blogs', async(req, res) => {
            const query = {};
            const blogs = await blogCollection.find(query).toArray();
            console.log(blogs);
            res.send(blogs);

        })

        app.get('/blog/:blogId', async(req, res) => {
            const blogId = req.params.blogId;
            const query = {_id: ObjectId(blogId)};
            const blogs = await blogCollection.find(query);
            console.log(blogs);
            res.send(blogs);

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