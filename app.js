import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import orderRoutes from "./routes/order.js"
import connectDB from "./config/connect.js";
import { PORT } from "./config/config.js";

dotenv.config()
// this function allows us to use all env files throught whole project

const app = express()

app.use(express.json())

// Routes
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/product", productRoutes)
app.use("/order", orderRoutes)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Server started on http://localhost:3000")
            }
        })
    } catch (error) {
        console.error("Error Starting Server : ", error)
    }
}

start();