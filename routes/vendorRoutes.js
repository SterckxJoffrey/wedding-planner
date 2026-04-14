const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const auth = require('../middleware/auth');

// GET tous les prestataires (optionnel: filtrer par weddingId)
router.get('/', auth, async (req, res) => {
  try {
    const filter = req.query.weddingId ? { weddingId: req.query.weddingId } : {};
    const vendors = await Vendor.find(filter).populate('weddingId', 'name date');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET un prestataire par ID
router.get('/:id', auth, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('weddingId', 'name date');
    if (!vendor) return res.status(404).json({ message: 'Prestataire introuvable' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST créer un prestataire
router.post('/', auth, async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res.status(201).json(savedVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT mettre à jour un prestataire
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVendor) return res.status(404).json({ message: 'Prestataire introuvable' });
    res.json(updatedVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE supprimer un prestataire
router.delete('/:id', auth, async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prestataire supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
