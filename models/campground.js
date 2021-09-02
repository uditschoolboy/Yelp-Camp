const mongoose = require("mongoose");

const campground = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  location: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Campground", campground);
