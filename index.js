import express from "express";
import cors from "cors";
import dontenv from "dotenv";
import mongoose from "mongoose";
import RecipeRoutes from "./routes/RecipeRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import bodyParser from "body-parser";

dontenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use("/api/v1/recipe", RecipeRoutes);
app.use("/api/v1/user", UserRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running successfully in http://localhost:5000");
    });
  })
  .catch(() => console.log("error"));
