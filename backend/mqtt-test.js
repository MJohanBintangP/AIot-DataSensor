require("dotenv").config();

const mqtt = require("mqtt");
const pool = require("./src/config/db");

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("✅ MQTT Connected");

  client.subscribe(process.env.MQTT_TOPIC, () => {
    console.log(`📡 Subscribe topic: ${process.env.MQTT_TOPIC}`);
  });
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    console.log("📥 Data masuk:", data);

    await pool.query(
      `
            INSERT INTO sensor_data(suhu, gas)
            VALUES($1, $2)
            `,
      [data.suhu, data.gas],
    );

    console.log("✅ Data saved to PostgreSQL");
  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }
});
