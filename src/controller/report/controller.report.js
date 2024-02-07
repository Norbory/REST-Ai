const { Router } = require('express');
const llenarYMarcarPDF = require('../../utils/pdf_generator');
const path = require('path');
const router = Router()
const ReportDAO = require('../../dao/class/dao.report');
const Report = new ReportDAO;


router.post('/llenar-pdf', async (req, res) => {
    const reportData = req.body;
    const {incidentId} = req.body;
    console.log(reportData);
    //comentario
    try {
        // Llama a la función para llenar y marcar el PDFs
        const pdfBytes = await llenarYMarcarPDF(reportData);

        // Guarda el PDF generado como reporte
        await Report.subirReporte(incidentId, reportData);
        
        // Envía el PDF generado como respuesta
        // const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');

        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=formulario_lleno.pdf');
        // Envía el PDF generado como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBytes);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
});


//Get report by ID, create a PDF and send it to the user
router.get('/report/:incidentId', async (req, res) => {
    const incidentId = req.params.incidentId;
    try {
        const report = await Report.getReportByIncidentId(incidentId);

        console.log(report);
        if (!report) {
            res.status(404).json({ message: 'Reporte no encontrado' }); 
        }
        // Llama a la función para llenar y marcar el PDF
        const pdfBytes = await llenarYMarcarPDF(report);
        // Envía el PDF generado como respuesta
        // const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=formulario_lleno.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBytes);
        res.download(pdfPath);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get the report generated by the user in llenar-pdf
router.get('/reporte-generado/last', async (req, res) => {

    const pdfPath = path.join(__dirname, '../../utils/formulario_lleno.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=formulario_lleno.pdf');
    res.download(pdfPath);
});


module.exports = router