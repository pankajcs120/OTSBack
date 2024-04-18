import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
.catch((error) => console.log(error));

// Configure CORS
app.use(cors({
    origin: "https://ots-front-main-8hq3.vercel.app", // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"] // Allowed headers
}));

app.use(express.json());
app.use(cookieParser());

// Define routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Simplified error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    res.status(errorStatus).send(errorMessage);
});
