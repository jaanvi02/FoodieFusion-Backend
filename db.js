const mongoose = require('mongoose');

const mongoURI = "mongodb://Foodproject:Jaanvi@ac-eo8rdrq-shard-00-00.2mfoibq.mongodb.net:27017,ac-eo8rdrq-shard-00-01.2mfoibq.mongodb.net:27017,ac-eo8rdrq-shard-00-02.2mfoibq.mongodb.net:27017/foodproject?ssl=true&replicaSet=atlas-kd592o-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");

    const fetchedData = await mongoose.connection.collection("food_items");
    const foodCategrogy= await mongoose.connection.collection("foodCategory");
    console.log("Connected to collection");

    const data = await fetchedData.find({}).toArray();
    const data1 = await foodCategrogy.find({}).toArray();
    global.food_items=data
    global.foodCategory=data1
   
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = mongoDB;
