const mqtt = require("mqtt");

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL);

module.exports = mqttClient;
