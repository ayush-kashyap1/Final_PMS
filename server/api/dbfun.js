import mongoose from 'mongoose';

export function dbconnect()

{
    // Replace the following with your Atlas connection string
  const uri = "mongodb+srv://lord_n_queen:lord_n_queen@vap.z8cquj6.mongodb.net/?retryWrites=true&w=majority";


  const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

  async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ping: 1});
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await mongoose.disconnect();
    }
  }

  run().catch(console.dir);
}
export const dbschema = (schemaName, dictionary) => {
  try{const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const customSchema = new Schema({
    _id: {
      type: ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    ...dictionary,
  });

  console.log("Schema created successfully");
  // Create and export the model based on the schema name
  return mongoose.model(schemaName, customSchema);
    }
    catch(error)
    {
        console.log('error in creating schema',error.message);
    }
};


// Assuming you have the dbfun function from the previous example

// Function to insert data into a model
export const dbinsert= async (modelName, data) => {
  try {
    // Get the model dynamically based on the modelName
    const Model = mongoose.model(modelName);

    // Use the create method to insert data into the collection
    const result = await Model.create(data);

    console.log(`Data inserted successfully into ${modelName} collection:`, result);
  } catch (error) {
    console.error(`Error inserting data into ${modelName} collection:`, error.message);
  }
};

// Function to find data in a model
export const dbfind = async (modelName, query) => {
  try {
    // Get the model dynamically based on the modelName
    const Model = mongoose.model(modelName);

    // Use the find method to get all data matching the query
    const result = await Model.find(query);

    console.log(`Data retrieved successfully from ${modelName} collection:`, result);
  } catch (error) {
    console.error(`Error retrieving data from ${modelName} collection:`, error.message);
  }
};

// Function to update data in a model
export const dbupdate = async (modelName, query, data) => {
  try {
    // Get the model dynamically based on the modelName
    const Model = mongoose.model(modelName);

    // Use the update method to update data matching the query
    const result = await Model.update(query, data);

    console.log(`Data updated successfully in ${modelName} collection:`, result);
  } catch (error) {
    console.error(`Error updating data in ${modelName} collection:`, error.message);
  }
};

// Function to delete data from a model
export const dbdelete = async (modelName, query) => {
  try {
    // Get the model dynamically based on the modelName
    const Model = mongoose.model(modelName);

    // Use the deleteOne method to delete data matching the query
    const result = await Model.deleteOne(query);

    console.log(`Data deleted successfully from ${modelName} collection:`, result);
  } catch (error) {
    console.error(`Error deleting data from ${modelName} collection:`, error.message);
  }
};

// Function to drop a model
export const dbdrop = async (modelName) => {
  try {
    // Get the model dynamically based on the modelName
    const Model = mongoose.model(modelName);

    // Use the collection.drop method to drop the model
    const result = await Model.collection.drop();

    console.log(`Dropped ${modelName} collection:`, result);
  } catch (error) {
    console.error(`Error dropping ${modelName} collection:`, error.message);
  }
};

// Function to drop all models
export const dbdropAll = async () => {
  try {
    // Use the connection.db.dropDatabase method to drop all models
    const result = await mongoose.connection.db.dropDatabase();

    console.log(`Dropped all collections:`, result);
  } catch (error) {
    console.error(`Error dropping all collections:`, error.message);
  }
};

// Function to close the database connection
export const dbclose = async () => {
  try {
    // Use the connection.close method to close the database connection
    const result = await mongoose.connection.close();

    console.log(`Closed database connection:`, result);
  } catch (error) {
    console.error(`Error closing database connection:`, error.message);
  }
};
