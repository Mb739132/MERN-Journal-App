const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const JournalSchema = new Schema(
  {
    heading: {
      type: String,
      required: "Please add journal heading",
      minlength: 1,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
    },
    journalText: {
      type: String,
      required: "Journal can not be blank!",
      minlength: 1,
      maxlength: 280,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Journal = model("Journal", JournalSchema);

module.exports = Journal;
