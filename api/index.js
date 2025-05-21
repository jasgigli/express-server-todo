// Main API entry point for Vercel
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/todos", todoRoutes);

// Health check endpoint
app.get("/", (_, res) => {
  res.status(200).json({ status: "ok", message: "Todo API is running" });
});

// Error handling middleware
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/todos`);
  });
} else {
  console.log("Server running in production mode as a serverless function");
}

// Export for Vercel serverless function
module.exports = app;
