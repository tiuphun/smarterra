const app = require('./app');
const mqttClient = require('./config/mqttConfig');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
