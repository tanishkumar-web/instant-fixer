const Service = require('../models/Service');

// Get all services
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get single service
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Create service
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Update service
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete service
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found',
      });
    }

    await service.remove();

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