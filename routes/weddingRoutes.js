const express = require('express');
const router = express.Router();
const Wedding = require('../models/Wedding');
const auth = require('../middleware/auth');

// GET tous les mariages
router.get('/', auth, async (req, res) => {
  try {
    const weddings = await Wedding.find();
    res.json(weddings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un mariage par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const wedding = await Wedding.findById(req.params.id);
    if (!wedding) return res.status(404).json({ message: 'Mariage introuvable' });
    res.json(wedding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer un mariage
router.post('/', auth, async (req, res) => {
  try {
    const newWedding = new Wedding(req.body);
    const savedWedding = await newWedding.save();
    res.status(201).json(savedWedding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT mettre à jour un mariage
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedWedding = await Wedding.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWedding) return res.status(404).json({ message: 'Mariage introuvable' });
    res.json(updatedWedding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un mariage
router.delete('/:id', auth, async (req, res) => {
  try {
    await Wedding.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mariage supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
