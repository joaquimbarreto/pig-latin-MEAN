const express = require("express");
const Translation = require("../models/translation");
const auth = require("../middleware/auth");
const router = new express.Router();
const cors = require("cors");

router.use(cors());

router.post("/translations", auth, async (req, res) => {
  const translation = new Translation({ ...req.body, owner: req.user._id });
  try {
    await translation.save();
    res.status(201).send(translation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/translations", auth, async (req, res) => {
  try {
    await req.user.populate("translations").execPopulate();
    res.send(req.user.translations);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/translations/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const translation = await Translation.findOne({ _id, owner: req.user._id });
    if (!translation) {
      return res.status(404).send();
    }
    res.send(translation);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/translations/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const translation = await Translation.findOne({ _id, owner: req.user._id });
    if (!translation) {
      return res.status(404).send();
    }
    updates.forEach((update) => (translation[update] = req.body[update]));
    await translation.save();
    res.send(translation);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/translations/:id", auth, async (req, res) => {
  try {
    const translation = await Translation.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!translation) {
      return res.status(404).send();
    }
    res.send(translation);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
