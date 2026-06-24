const Quotation = require('../models/Quotation');

// Get all quotations
const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate('vendor', 'vendorName companyName email')
      .sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single quotation
const getQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('vendor', 'vendorName companyName email');
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create quotation
const createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);
    res.status(201).json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update quotation
const updateQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json(quotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete quotation
const deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndDelete(req.params.id);
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    res.json({ message: 'Quotation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalVendors = await require('../models/Vendor').countDocuments();
    const activeQuotations = await Quotation.countDocuments({ status: 'submitted' });
    const pendingQuotations = await Quotation.countDocuments({ status: 'pending' });
    const approvedQuotations = await Quotation.countDocuments({ status: 'approved' });
    const recentQuotations = await Quotation.find()
      .populate('vendor', 'vendorName companyName')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalVendors,
      activeQuotations,
      pendingQuotations,
      approvedQuotations,
      recentQuotations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Compare quotations by title
const compareQuotations = async (req, res) => {
  try {
    const { title } = req.query;
    const quotations = await Quotation.find({ title })
      .populate('vendor', 'vendorName companyName email');
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuotations,
  getQuotation,
  createQuotation,
  updateQuotation,
  deleteQuotation,
  getDashboardStats,
  compareQuotations
};