const mongoose = require("mongoose");

// IMPORTANT - Add a '.env' in ./server with a valid mongo link 'MONGODB_URI=<REAL-MONGO-LINK>'
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
