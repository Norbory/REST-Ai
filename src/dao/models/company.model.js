const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  ID_area: mongoose.Schema.Types.ObjectId,
  Name: String
});

const jetsonSchema = new mongoose.Schema({
  ID_Company: mongoose.Schema.Types.ObjectId,
  ID_Area: mongoose.Schema.Types.ObjectId,
  ID_Cam: mongoose.Schema.Types.ObjectId
});

const userSchema = new mongoose.Schema({
  ID_Company: mongoose.Schema.Types.ObjectId,
  Name: String,
  role: String
});

const incidentSchema = new mongoose.Schema({
  ID_area: mongoose.Schema.Types.ObjectId,
  ID_Cam: mongoose.Schema.Types.ObjectId,
  date: {
    type: Date,
    default: () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }))
  },
  imageUrls: [String],
  EPPs: [String],
  Reported: {
    type: Boolean,
    default: false
  },
  Deleted: {
    type: Boolean,
    default: false
  }
});

const companySchema = new mongoose.Schema({
  Nombre: String,
  CamQty: Number,
  ID_Company: mongoose.Schema.Types.ObjectId,
  areas: {
    type: [areaSchema],
    default: []
  },
  jetson: {
    type: [jetsonSchema],
    default: []
  },
  users: {
    type: [userSchema],
    default: []
  },
  incidents: {
    type: [incidentSchema],
    default: []
  }
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;
