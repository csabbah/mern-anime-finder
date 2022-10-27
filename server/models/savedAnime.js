const { Schema, model } = require("mongoose");

const animeSchema = new Schema(
  {
    title: {
      type: String,
    },
    episodes: {
      type: String,
    },
    genres: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    ranking: {
      type: String,
    },
    status: {
      type: String,
    },
    synopsis: {
      type: String,
    },
    ranking: {
      type: String,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const savedAnime = model("savedAnime", animeSchema);

module.exports = savedAnime;
