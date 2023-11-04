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
        await llenarYMarcarPDF(reportData);

        // Guarda el PDF generado como reporte
        await Report.subirReporte(incidentId, reportData);
        
        // Envía el PDF generado como respuesta
        const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=formulario_lleno.pdf');

        res.download(pdfPath);
        


    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }



});


//Get report by ID, create a PDF and send it to the user
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const report = await Report.getReportById(id);
        // Llama a la función para llenar y marcar el PDF
        await llenarYMarcarPDF(report);
        // Envía el PDF generado como respuesta
        const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=formulario_lleno.pdf');
        res.download(pdfPath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router