var express = require("express");
var router = express.Router();
const Campground = require("../models/campground");
const Error = require("../utils/error");
const catchAsync = require("../utils/catchAsync");
const joiCampgroundSchema = require("../joiSchemas/campground");

const validateCampground = (req, res, next) => {
  const { error } = joiCampgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new Error(msg, 400);
  } else {
    next();
  }
};

router.get("/create", (req, res) => {
  res.render("campgrounds/create", { c: { name: "" } });
});

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find();
  //   console.log(campgrounds);
  res.render("campgrounds/all", { c: campgrounds });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { c: campground });
});

// router.post("/", async (req, res, next) => {
//   try {
//     const campground = new Campground({ ...req.body.campground });
//     if (campground.price === "" || campground.price === null)
//       campground.price = 0;
//     await campground.save();
//     res.redirect("/campgrounds");
//   } catch (e) {
//     next(e);
//   }
// });

// or we could do it this way but I prefer the above method
router.post(
  "/",
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    if (campground.price === "" || campground.price === null)
      campground.price = 0;
    await campground.save();
    res.redirect("/campgrounds");
  })
);

router.put("/:id", validateCampground, async (req, res) => {
  console.log("put route hit");
  const id = req.params.id;
  console.log(id);
  console.log(req.body.campground);
  await Campground.updateOne(
    { _id: id },
    {
      ...req.body.campground,
    }
  );
  res.redirect("/campgrounds");
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/showCampground", { c: campground });
  })
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

module.exports = router;
