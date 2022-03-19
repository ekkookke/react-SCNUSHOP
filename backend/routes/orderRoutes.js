import express from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered,getMyOrders,getOrders } from '../controllers/orderController.js';
import { protect ,admin} from "../middlewares/authMiddleware.js";


const router = express.Router();

//protect作用是确认登录之后才能执行后续操作
router.route("/").post(protect, addOrderItems).get(protect,admin,getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin,updateOrderToDelivered);

export default router;