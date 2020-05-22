const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());
Report = require("./models/reports");

app.use("/uploads", express.static("uploads"));
//middlewares
app.use(cors()); //allows cors request from another domain
// Connect to Mongoose
const mongouri =
  "mongodb+srv://rahul:rahul@cluster0-y3x4u.mongodb.net/Grievance?retryWrites=true&w=majority";
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected ");
});
mongoose.connection.on("error", (e) => {
  console.log("error");
});
var db = mongoose.connection;

// handle get request

app.get("/", (req, res) => {
  res.send("Please use /api/grievances");
});

app.get("/api/grievances", (req, res) => {
  Report.getReport((err, report) => {
    if (err) {
      throw err;
    }
    res.json(report);
    console.log("obj:", report);
  });
});

app.get("/api/grievances/:_id", (req, res) => {
  Report.getReportById(req.params._id, (err, report) => {
    if (err) {
      throw err;
    }
    res.json(report);
  });
});

app.post("/api/grievances", (req, res) => {
  var report = req.body;
  Report.addReport(report, (err, report) => {
    if (err) {
      throw err;
    }
    res.json(report);
  });
});

app.put("/api/grievances/:_id", (req, res) => {
  var id = req.params._id;
  var report = req.body;
  Report.updateReport(id, report, {}, (err, report) => {
    if (err) {
      throw err;
    }
    res.json(report);
  });
});

app.delete("/api/grievances/:_id", (req, res) => {
  var id = req.params._id;
  Report.removeReport(id, (err, report) => {
    if (err) {
      throw err;
    }
    res.json(report);
  });
});

app.listen(3000);

console.log("Running on port 3000");
