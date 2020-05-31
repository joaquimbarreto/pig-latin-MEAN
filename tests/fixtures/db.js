const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Translation = require("../../models/translation");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "George Floyd",
  email: "black@lives.matter",
  password: "20200525",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const translationOne = {
  _id: new mongoose.Types.ObjectId(),
  original: "Liverpool Football Club",
  translation: "Iverpoollay Ootballfay Lubcay",
  owner: userOne._id,
};

const translationTwo = {
  _id: new mongoose.Types.ObjectId(),
  original: "Roman Holiday",
  translation: "Omanray Olidayhay",
  owner: userOne._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Translation.deleteMany();
  await new User(userOne).save();
  await new Translation(translationOne).save();
  await new Translation(translationTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  translationOne,
  translationTwo,
  setupDatabase,
};
