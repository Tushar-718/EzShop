import express from "express"
// import { getProductsByCategoryId } from "../controllers/product.js";


const router = express.Router();

router.post("/", createOrder);

export default router