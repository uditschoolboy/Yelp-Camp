const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const axios = require("axios").default;
const fetch = require("node-fetch");

mongoose
  .connect("mongodb://localhost/yelpcamp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => "Mongo Connected")
  .catch(() => "Error Can't connect to Mongo");

module.exports = async function seedDb() {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const name = `${
      descriptors[Math.floor(Math.random() * descriptors.length - 1)]
    } ${places[Math.floor(Math.random() * places.length)]}`;
    const city = Cities[Math.floor(Math.random() * 1000)].city;
    const state = Cities[Math.floor(Math.random() * 1000)].state;
    const price = Math.random() * 31;
    const location = `${city}, ${state}`;
    const description = "awesome tdescirptionasl;djf";
    const image = await fetch("https://source.unsplash.com/1600x900/?camping")
      
    console.log(image);
    const campground = new Campground({
      name,
      price,
      description,
      location,
      image: image.url,
    });
    campground.save();
    console.log(campground);
  }
};
