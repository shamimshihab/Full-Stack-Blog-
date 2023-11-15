const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AboutMeSchema = new Schema({
  description: { type: String },
});

const AboutMeModel = model("AboutMe", AboutMeSchema);

module.exports = AboutMeModel;
