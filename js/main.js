import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/weather", async (req, res) => {
  try {
    const { city } = req.body;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;

    res.status(200).json({ temperature, windSpeed });
  } catch (error) {
    res.status(500).json("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
