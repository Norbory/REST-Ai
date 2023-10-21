const { Router } = require('express');
const llenarYMarcarPDF = require('../../utils/pdf_generator');
const path = require('path');
const router = Router()
const ReportDAO = require('../../dao/class/dao.report');
const Report = new ReportDAO;


router.post('/llenar-pdf', async (req, res) => {
    const reportData = req.body;
    const {incidentId} = req.body;

    try {
        // Llama a la función para llenar y marcar el PDF
        await llenarYMarcarPDF(info);

        // Guarda el PDF generado como reporte
        await Report.subirReporte(incidentId, reportData);
        
        // Envía el PDF generado como respuesta
        const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');
        res.sendFile(pdfPath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
});


module.exports = router