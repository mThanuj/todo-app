import connectDB from "./db/index.js";
import app from "./app.js";
import { PORT } from "./constants.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed: ${error}`);
  });
