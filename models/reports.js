var mongoose = require("mongoose");

//report schema
const reportSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  contact: {
    type: String,
  },
  category: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

var Report = (module.exports = mongoose.model(
  "Report",
  reportSchema,
  "gReport"
));

// Get Books
module.exports.getReport = (callback, limit) => {
  Report.find(callback).limit(limit);
};

// Get report by id
module.exports.getReportById = (id, callback) => {
  Report.findById(id, callback);
};

// Add report
module.exports.addReport = (report, callback) => {
  Report.create(report, callback);
};

// Update Report
module.exports.updateReport = (id, report, options, callback) => {
  var query = { _id: id };
  var update = {
    subject: report.subject,
    description: report.description,
    username: report.username,
    location: report.location,
    category: report.category,
  };
  Report.findOneAndUpdate(query, update, options, callback);
};

// Delete Report
module.exports.removeReport = (id, callback) => {
  var query = { _id: id };
  Report.remove(query, callback);
};
