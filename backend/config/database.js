const mongoose = require("mongoose");

// const connectDatabase = () => {
//     mongoose.connect("mongodb://localhost:27017/NewEcommerce", {
//         useNewUrlParser: true
//     })
// }

const connectDatabase = async () => {
    try {
      const conn = await mongoose.connect(`mongodb://localhost:27017/NewEcommerce`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports=connectDatabase;