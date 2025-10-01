const Booking = require('../models/Booking');

// Get all bookings
exports.getBookings = async (req, res, next) => {
  try {
    let query;

    // If user is admin, show all bookings
    if (req.user.role === 'admin') {
      query = Booking.find().populate('user helper service');
    } else {
      // If user is not admin, show only their bookings
      query = Booking.find({ user: req.user.id }).populate('helper service');
    }

    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get single booking
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user helper service');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    // Make sure user is booking owner or admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Create booking
exports.createBooking = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Update booking
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this booking',
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this booking',
      });
    }

    await booking.remove();

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