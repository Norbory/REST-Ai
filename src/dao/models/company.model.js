const mongoose = require('mongoose');


const areaSchema = new mongoose.Schema({
  Name: {type:String, required: true},
});

const jetsonSchema = new mongoose.Schema({
  ID_Area: {type:mongoose.Schema.Types.ObjectId, required: true},
});

const userSchema = new mongoose.Schema({
  Name:{type: String, required: true},
  role: {type:String,required: true},
  telegramID: {type:String, required: false},
});

const incidentSchema = new mongoose.Schema({
  ID_area: {type:mongoose.Schema.Types.ObjectId, required: true},
  ID_Cam: {type: mongoose.Schema.Types.ObjectId, required: true},
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
  Name: {type:String, required: true},
  CamQty: {type:Number, required: true},
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
  },
  date: {
    type: Date,
    default: () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }))
  }
});


const Company = mongoose.model('Company', companySchema);

module.exports = Company;
