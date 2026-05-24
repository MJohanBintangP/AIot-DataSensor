const sensorService = require("../services/sensorService");

async function getAllSensors(req, res) {
  const sensors = await sensorService.getAllSensors();
  res.json(sensors);
}

module.exports = {
  getAllSensors,
};
