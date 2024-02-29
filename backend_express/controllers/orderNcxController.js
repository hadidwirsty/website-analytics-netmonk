const Order = require('../model/Order');

const getAllOrderNcx = async (req, res) => {
  try {
    const orders = await Order.find(
      {},
      'orderId namaPelanggan treg witel statusFulfillment orderCreatedDate produk pic sid orderClosingDate'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderNcx = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    const order = await Order.findOne(
      { orderId },
      'orderId namaPelanggan treg witel statusFulfillment orderCreatedDate produk pic sid orderClosingDate'
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrderNcx,
  getOrderNcx,
};
