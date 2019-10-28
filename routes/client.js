const express = require("express");
const router = express.Router();
const Client = require("../models/client");

router.post("/client/create", async (req, res) => {
  try {
    const existingClient = await Client.findOne({ name: req.body.name });
    if (existingClient !== null) {
      return res.status(400).json({
        error: {
          message: "Client already exist"
        }
      });
    }
    const newClient = new Client({
      name: req.body.name,
      lastName: req.body.lastName,
      address: req.body.address
    });
    await newClient.save();
    res.json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/client", async (req, res) => {
  try {
    const client = await Client.find();
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
