const mongoose = require("mongoose");

// publication schema
const PublicationSchema = mongoose.Schema({
  id: Number,
  name: String,
  books: [String],
});

// publication model
const PublicationModel = mongoose.Model(PublicationSchema);

module.exports = PublicationModel;
