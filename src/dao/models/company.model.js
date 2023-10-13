const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const areaSchema = new mongoose.Schema({
  Name: {type:String, required: true},
});

const jetsonSchema = new mongoose.Schema({
  ID_Area: {type:mongoose.Schema.Types.ObjectId, required: true},
});

const userSchema = new mongoose.Schema({
  Name:{type: String, required: true},
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};


const Company = mongoose.model('Company', companySchema);


module.exports = Company;
