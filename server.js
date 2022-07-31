const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

//Import Routes
const post = require("./routes/PostRoutes");
const auth = require("./routes/AuthenticateRoutes");
const user = require("./routes/UserRoutes");

//Routes;
app.use("/users", user);
app.use("/posts", post);
app.use("/", auth);

//start application server on port 3000
app.listen(port, () => {
  console.log(`The server started on port: ${port}`);
});
