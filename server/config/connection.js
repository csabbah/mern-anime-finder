const mongoose = require("mongoose");

// IMPORTANT - Add a '.env' in ./server with a valid mongo link 'MONGODB_URI=<REAL-MONGO-LINK>'
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// For simplicity we can just do this too (if you don't want to create the env file yet)
// mongoose.connect('mongodb+srv://user-01:acuratl@cluster0.kux90kt.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

module.exports = mongoose.connection;
