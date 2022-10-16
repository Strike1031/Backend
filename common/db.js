const { default: mongoose } = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/CryptoPrice"
  )
  .then(function (result, second) {
    console.log("mongodb connect success");
  })
  .catch(function (err) {
    console.log("Error", err);
  });
