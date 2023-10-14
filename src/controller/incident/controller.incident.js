const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const IncidentDAO = require('../../dao/class/dao.incident');

const Incident = new IncidentDAO;

cloudinary.config({
  cloud_name: 'dmbtlv0hg',
  api_key: '381815326731569',
  api_secret: 'yBoghdZkYzBETXFy5Dlt9VgWnP8',
});

// Obtener todos los incidentes de una compañía
router.get('/:companyId/incidents', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const incidents = await Incident.getIncidentsByCompanyId(companyId);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar un nuevo incidente a una compañía
router.post('/:companyId/incidents', async (req, res) => {
  let url =[];
  const companyId = req.params.companyId;
  const incidentData = req.body;
  if( 1) {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${incidentData.imageUrls[0]}`
    );
    url[0] = result.secure_url;
    console.log("URL de imagen subida a Cloudinary:", result.secure_url);
    incidentData.imageUrls = url;
  }
  try { 
    const newIncident = await Incident.addIncident(companyId, incidentData);
    res.json(newIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un incidente existente
router.put('/:companyId/incidents/:incidentId', async (req, res) => {
  const companyId = req.params.companyId;
  const incidentId = req.params.incidentId;
  const newData = req.body;
  try {
    const updatedIncident = await Incident.updateIncident(companyId, incidentId, newData);
    res.json(updatedIncident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para obtener el resumen de incidentes del día
router.get('/:companyId/incidents/summary', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    // Obtener la fecha actual en el huso horario de Lima (UTC-5)
    const limaTimezone = 'America/Lima';
    const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: limaTimezone }));

    // Obtener todos los incidentes del día para la compañía específica
    const incidents = await Incident.getIncidentsByCompanyIdAndDate(companyId,currentDate);

    // Calcular el resumen
    const summary = {
      Detections: incidents.length,
      IncompleteEPPs: incidents.reduce((total, incident) => total + incident.EPPs.length, 0),
      Reports: incidents.filter(incident => incident.Reported).length
    };

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:companyId/incidents/statistics', async (req, res) => {
  try {
    const weeklyStats = await Incident.getWeeklyStatistics();
    const monthlyStats = await Incident.getMonthlyStatistics();
    res.json({ weeklyStats, monthlyStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
