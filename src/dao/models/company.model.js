const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  Name: {type:String, required: true},
});

const jetsonSchema = new mongoose.Schema({
  ID_Area: {type:mongoose.Schema.Types.ObjectId, required: true},
});

const machineSchema = new mongoose.Schema({
  Error: {type: Boolean, required: true},
  Code: {type: String, required: true},
  RAM: {type: String, required: true},
  GPU: {type: String, required: true},
  date: {
    type: Date,
    default: () => new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }))
  },
});

const reportSchema = new mongoose.Schema({
  incidentId: {type:mongoose.Schema.Types.ObjectId, required: false},
  Nombre: {type: String, required: false},
  DNI: {type: String, required: false},
  Cargo: {type: String, required: false},
  Firma: {type: String, required: false},
  Fecha: {type: String, required: false},
  Hora: {type: String, required: false},
  Contrata: {type: String, required: false},
  ActosSubestandares: {
    Marked: {type: Boolean, required: false},
    CheckA: {type: Boolean, required: false},
    CheckB: {type: Boolean, required: false},
    CheckC: {type: Boolean, required: false},
    CheckD: {type: Boolean, required: false},
    CheckE: {type: Boolean, required: false},
    CheckF: {type: Boolean, required: false},
    CheckG: {type: Boolean, required: false},
    CheckH: {type: Boolean, required: false},
    CheckI: {type: Boolean, required: false},
    Otros: {type: Boolean, required: false},
    OtrosTexto: {type: String, required: false},
  },
  DetalleActo: {type: String, required: false},
  CondicionesSubestandares: {
    Marked: {type: Boolean, required: false},
    Check1: {type: Boolean, required: false},
    Check2: {type: Boolean, required: false},
    Check3: {type: Boolean, required: false},
    Check4: {type: Boolean, required: false},
    Check5: {type: Boolean, required: false},
    Check6: {type: Boolean, required: false},
    Otros: {type: Boolean, required: false},
    OtrosTexto: {type: String, required: false},
  },
  DetalleCondicion: {type: String, required: false},
  Correción: {type: String, required: false},
  CheckList: {
    Check1: {type: Boolean, required: false},
    Check2: {type: Boolean, required: false},
    Check3: {type: Boolean, required: false},
  },
  Observador: {type: String, required: false},
});

const tokenSchema = new mongoose.Schema({
  token: {type: String, required: true},
});

const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type:String,required: true},
  telegramID: {type:String, required: false},
  email: {type:String, required: false},
  DNI: {type:String, required: false},
  numContact: {type:String, required: false},
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
  },
  // Guardamos solo los IDs de los reportes en el incidente
  reportes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    }
  ],
  supervisor: {type: String, required: false},
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
  tokens: {
    type: [tokenSchema],
    default: []
  },
  incidents: {
    type: [incidentSchema],
    default: []
  },
  machines: {
    type: [machineSchema],
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
const Report = mongoose.model('Report', reportSchema);


module.exports = {
  Company,
  Report
};