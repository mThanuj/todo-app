import connectDB from "./db/index.js";
import app from "./app.js";
import { PORT } from "./constants.js";

connectDB()
  .then(() => {
    app.use((err, _, res, _) => {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    });
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed: ${error}`);
  });
