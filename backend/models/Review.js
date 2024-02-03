const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  comment: { type: String, required: true },
});

const ReviewModel = model("Review", ReviewSchema);

module.exports = ReviewModel;
