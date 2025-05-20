import mongoose from "mongoose";
import validator from "validator";

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v, { require_protocol: true }),
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v, { require_protocol: true }),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

const Article = mongoose.model("article", articleSchema);

export default Article;
