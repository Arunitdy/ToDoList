const mongoose = require('mongoose');
mongoose.connect("mongodb://arunmundakkal003:u4NgM8YsoafWMfcO@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,cluster0-shard-00-02.xxxxx.mongodb.net:27017/sample_mflix?ssl=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority")

.then(() => {
    console.log("✅ Connected to MongoDB successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  });
