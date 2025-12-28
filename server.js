const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB
mongoose.connect(
  "mongodb+srv://admin:ronaldoabc@cluster0.hf0pkks.mongodb.net/ronaldoDB?retryWrites=true&w=majority&authSource=admin"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const fanSchema = new mongoose.Schema({
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Fan = mongoose.model("Fan", fanSchema);

// APIs
app.get("/fans", async (req, res) => {
  const fans = await Fan.find().sort({ createdAt: -1 });
  res.json(fans);
});

app.post("/fans", async (req, res) => {
  await new Fan({ message: req.body.message }).save();
  res.json({ success: true });
});

// Force homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
