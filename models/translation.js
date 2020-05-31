const mongoose = require("mongoose");

const traslationSchema = new mongoose.Schema(
  {
    original: {
      text: String,
      trim: true,
      required: true,
    },
    translation: {
      text: String,
      default: false,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Translation = mongoose.model("Traslation", traslationSchema);

module.exports = Translation;
