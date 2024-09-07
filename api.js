const func = require("./funckcije");
const fs = require("fs");
const express = require("express");
const https = require("https");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET",
    allowedHeaders: "Content-Type",
  })
);

app.use(express.json());

app.get("/networkInfo", (req, res) => {
  res.send({
    "Network interfaces": func.Network(),
  });
});

app.get("/systemInfo", (req, res) => {
  res.send({
    "System info": func.System(),
  });
});

app.get("/diskInfo", (req, res) => {
  res.send({
    "Disk info": func.Disk()[1],
  });
});

app.get("/avgLoad", (req, res) => {
  res.send({
    "Average load": func.LoadAvg(),
  });
});

app.get("/cpuInfo", (req, res) => {
  res.send({
    "CPU info": func.CPU(),
  });
});

app.get("/loginInfo", (req, res) => {
  res.send({
    "Last login": func.Login(),
  });
});

app.get("/memInfo", (req, res) => {
  res.send({
    "Memory info": func.Memory(),
  });
});

app.get("*", (req, res) => {
  res.send({ error: "Error 404"});
});

try {
  const options = {
	key: fs.readFileSync('keys/key.pem'),
	cert: fs.readFileSync('keys/cert.pem')
   }
   https.createServer(options, app).listen(43567);
   console.log("Server stared at port 43567");

} catch (error) {
  console.log(`Error starting api: ${error}`);
}
