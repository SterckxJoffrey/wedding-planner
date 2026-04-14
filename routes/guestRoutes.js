const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const auth = require('../middleware/auth');

// GET tous les invités (optionnel: filtrer par weddingId)
router.get('/', auth, async (req, res) => {
  try {
    const filter = req.query.weddingId ? { weddingId: req.query.weddingId } : {};
    const guests = await Guest.find(filter).populate('weddingId', 'name date');
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un invité par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).populate('weddingId', 'name date');
    if (!guest) return res.status(404).json({ message: 'Invité introuvable' });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer un invité
router.post('/', auth, async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT mettre à jour un invité
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGuest) return res.status(404).json({ message: 'Invité introuvable' });
    res.json(updatedGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un invité
router.delete('/:id', auth, async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invité supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
