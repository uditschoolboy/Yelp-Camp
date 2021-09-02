const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");
const seedDb = require("./seedDb");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const campgroundRoutes = require("./routes/campgrounds");
const engine = require("ejs-mate");
const Error = require("./utils/error");
const catchAsync = require("./utils/catchAsync");

mongoose
  .connect("mongodb://localhost/yelpcamp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => "Mongo Connected")
  .catch(() => "Error Can't connect to Mongo");

app.engine("ejs", engine);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundRoutes);

app.get("/chicken", (req, res) => {
  //   chicken();
  const e = new Error("505");
  res.send(e.type);
});

app.get("/", (req, res) => {
  const campground = new Campground({
    name: "first",
    price: 1,
    image: "someImageurl",
  });
  console.log(campground);
  res.render("home", { campground });
});

app.all("*", (req, res, next) => {
  next(new Error("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Oops Something Went Wrong" } = err;
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => console.log("YelpCamp running"));

// app.get("/makeAll", (req, res) => {
//   seedDb();
//   res.send("made all campgrounds");
// });
