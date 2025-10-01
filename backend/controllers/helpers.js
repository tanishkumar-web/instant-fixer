const Helper = require('../models/Helper');
const User = require('../models/User');

// Get all helpers
exports.getHelpers = async (req, res, next) => {
  try {
    const helpers = await Helper.find().populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: helpers.length,
      data: helpers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get single helper
exports.getHelper = async (req, res, next) => {
  try {
    const helper = await Helper.findById(req.params.id).populate('user', 'name email');

    if (!helper) {
      return res.status(404).json({
        success: false,
        error: 'Helper not found',
      });
    }

    res.status(200).json({
      success: true,
      data: helper,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Create helper
exports.createHelper = async (req, res, next) => {
  try {
    const helper = await Helper.create(req.body);

    res.status(201).json({
      success: true,
      data: helper,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Update helper
exports.updateHelper = async (req, res, next) => {
  try {
    const helper = await Helper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!helper) {
      return res.status(404).json({
        success: false,
        error: 'Helper not found',
      });
    }

    res.status(200).json({
      success: true,
      data: helper,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete helper
exports.deleteHelper = async (req, res, next) => {
  try {
    const helper = await Helper.findById(req.params.id);

    if (!helper) {
      return res.status(404).json({
        success: false,
        error: 'Helper not found',
      });
    }

    await helper.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};