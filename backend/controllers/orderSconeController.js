const Order = require('../model/Order');

const getAllOrderScone = async (req, res) => {
  try {
    const orders = await Order.find(
      {},
      'nomorSc namaPelanggan nomorHpPelanggan emailPelanggan nomorInternet treg witel statusAktivasi statusWFM tanggalOrder statusResume username password secretKey catatan'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewOrderScone = async (req, res) => {
  const {
    nomorSc,
    namaPelanggan,
    nomorHpPelanggan,
    emailPelanggan,
    nomorInternet,
    treg,
    witel,
    statusAktivasi,
    statusWFM,
    statusResume,
    tanggalOrder
  } = req.body;

  const orderDate = tanggalOrder ? new Date(tanggalOrder) : Date.now();

  const newOrder = new Order({
    nomorSc,
    namaPelanggan,
    nomorHpPelanggan,
    emailPelanggan,
    nomorInternet,
    treg,
    witel,
    statusAktivasi,
    statusWFM,
    statusResume,
    tanggalOrder: orderDate
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderScone = async (req, res) => {
  const { id: nomorSc } = req.params;

  const {
    namaPelanggan,
    statusResume,
    nomorHpPelanggan,
    emailPelanggan,
    nomorInternet,
    statusAktivasi,
    statusWFM,
    username,
    password,
    secretKey,
    catatan
  } = req.body;

  const updateData = {
    ...(namaPelanggan && { namaPelanggan }),
    ...(statusResume && { statusResume }),
    ...(nomorHpPelanggan && { nomorHpPelanggan }),
    ...(emailPelanggan && { emailPelanggan }),
    ...(nomorInternet && { nomorInternet }),
    ...(statusAktivasi && { statusAktivasi }),
    ...(statusWFM && { statusWFM }),
    ...(username && { username }),
    ...(password && { password }),
    ...(secretKey && { secretKey }),
    ...(catatan && { catatan })
  };

  try {
    const updatedOrder = await Order.findOneAndUpdate({ nomorSc }, updateData, {
      new: true
    });

    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(204).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderScone = async (req, res) => {
  const { id: nomorSc } = req.params;

  try {
    const order = await Order.findOne(
      { nomorSc },
      'nomorSc namaPelanggan nomorHpPelanggan emailPelanggan nomorInternet treg witel statusAktivasi statusWFM tanggalOrder statusResume username password secretKey catatan'
    );
    if (order) {
      res.json(order);
    } else {
      res.status(204).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrderScone,
  createNewOrderScone,
  updateOrderScone,
  getOrderScone
};
