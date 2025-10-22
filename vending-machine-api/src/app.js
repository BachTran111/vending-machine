import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import productRouter from "./routes/product.route.js";
import slotRouter from "./routes/slot.route.js";
import transactionRouter from "./routes/transaction.route.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

// routes
app.use("/api/products", productRouter);
app.use("/api/slots", slotRouter);
app.use("/api/transactions", transactionRouter);

// Serve static files
app.use(express.static(path.join(__dirname, "../vending-machine-fe")));

// Handle frontend routing
app.get(
  [
    "/",
    "/drink",
    "/home",
    "/report",
    "/login",
    "/register",
    "/account",
    "/forgotpassword",
    "/t1",
    "/t2",
    "/t3",
    "/t4",
    "/t5",
  ],
  (req, res) => {
    const page =
      req.path === "/" ? "/index.html" : `${req.path.toLowerCase()}.html`;
    res.sendFile(path.join(__dirname, "../vending-machine-fe", page));
  }
);

// error handler (cuối cùng)
app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
