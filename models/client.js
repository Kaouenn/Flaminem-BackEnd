const mongoose = require("mongoose");

const Client = mongoose.model("Client", {
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: { type: String }
});

module.exports = Client;
