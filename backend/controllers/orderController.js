import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc Create new order
// @route GET /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc Create order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error("未找到该订单!");
    }
});

// @desc 更改为已支付状态
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    const { id, status, update_time, email_address } = req.body;

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id,
            status,
            update_time,
            email_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404)
        throw new Error("未找到该订单!");
    }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
  
      const updatedOrder = await order.save();
  
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  });

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders);
});


// @desc Get all orders
// @route PUT /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')//填充数据
    res.json(orders);
});

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
};
