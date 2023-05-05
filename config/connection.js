const mongoose = require("mongoose");

mongoose
  .connect(
   
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error, "could not connect to MongoDB");
  });


module.exports = mongoose.connection;