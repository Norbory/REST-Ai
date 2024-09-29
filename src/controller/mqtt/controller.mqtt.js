const express = require('express');
const router = express.Router();
const MqttDAO = require('../../dao/class/dao.mqtt');

const Mqtt = new MqttDAO;
const opcionesHora = { 
    month: '2-digit', 
    day: '2-digit' ,
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second:'2-digit',
    hour12: false };

router.post('/:companyId/mensaje', async (req, res) => {
    const topic = req.body.topic;    
    const message = req.body.message; 

    try {
        const response = await Mqtt.sendAndReceive(topic, JSON.stringify(message));
        const fecha = new Date(); 
        res.status(200).json({ topic, receivedMessage: response, dia: new Intl.DateTimeFormat('es-ES', opcionesHora).format(fecha)}); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;