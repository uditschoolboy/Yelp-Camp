const Joi = require("joi");

module.exports = campgroundSchema = Joi.object({
    campground: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().empty("").min(0),
      image: Joi.string().required(),
      location: Joi.string().required(),
      description: Joi.string().required(),
    }),
  });