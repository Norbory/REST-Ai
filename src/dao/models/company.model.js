const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const areaSchema = new mongoose.Schema({
  Name: {type:String, required: true},
});

const jetsonSchema = new mongoose.Schema({
  ID_Area: {type:mongoose.Schema.Types.ObjectId, required: true},
});

const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type:String,required: true},
  telegramID: {type:String, required: false},
  email: {type:String, required: false},
});

const incidentSchema = new mongoose.Schema({
  ID_area: {type:mongoose.Schema.Types.ObjectId, required: true},
  ID_Cam: {type: mongoose.Schema.Types.ObjectId, required: true},
  areaName: {type: String, required: false},
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
  CamQty: {type:Number, default: 0},
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

incidentSchema.pre('save', async function(next) {
  try {
    const area = await mongoose.model('Company').findOne({
      'areas._id': this.ID_area
    }, {
      'areas.$': 1
    });

    if (area) {
      this.areaName = area.areas[0].Name;
    }

    next();
  } catch (error) {
    next(error);
  }
});


const Company = mongoose.model('Company', companySchema);


module.exports = Company;
