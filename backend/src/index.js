const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/user.routes");
const oauthRoutes = require("./routes/oauth.routes");
require("dotenv").config();
app.use(express.json());
app.use(cors({ origin: "https://xeno-deployed-assignment.vercel.app" }));
app.use(cookieParser());
const db = require("./db/index");
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1", oauthRoutes);
app.use("/api/v1/users", userRoutes);
db.connectdb();
app.listen(3000, () => console.log("listening on port 3000"));
