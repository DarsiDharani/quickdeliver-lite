const Delivery = require('../models/Delivery');

// Create new delivery (by customer)
exports.createDelivery = async (req, res) => {
  try {
    const newDelivery = new Delivery({
      ...req.body,
      customer: req.user.id,
      status: 'pending',
    });

    const saved = await newDelivery.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create delivery' });
  }
};

// Get pending deliveries (for drivers)
exports.getPendingDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.status(200).json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

// Claim delivery (by driver)
exports.claimDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    if (delivery.status !== 'pending') {
      return res.status(400).json({ message: 'Delivery already claimed or completed' });
    }

    delivery.claimedBy = req.user.id;
    delivery.status = 'claimed';
    await delivery.save();

    res.status(200).json({ message: 'Delivery claimed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
