const mqttClient = require("../config/mqtt");

function subscribeToSensorTopics() {
  mqttClient.subscribe(process.env.MQTT_TOPIC || "sensors/#");
}

module.exports = {
  subscribeToSensorTopics,
};
