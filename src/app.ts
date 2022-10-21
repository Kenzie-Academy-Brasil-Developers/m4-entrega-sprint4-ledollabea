import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.listen(3005, () => {
  console.log("Server running");
});

export default app;