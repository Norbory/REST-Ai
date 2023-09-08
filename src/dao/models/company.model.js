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
  ID_Area: mongoose.Schema.Types.ObjectId,
  ID_Cam: mongoose.Schema.Types.ObjectId,
  role: String
});

const companySchema = new mongoose.Schema({
  Nombre: String,
  CamQty: Number,
  ID_Company: mongoose.Schema.Types.ObjectId,
  areas: [areaSchema],
  jetson: [jetsonSchema],
  users: [userSchema]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
