const func = require("./funckcije");
const express = require("express");
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

app.get("/getFullData", (req, res) => {
  res.send({
    "System info": func.System(),
    "Network interfaces": func.Network(),
    "Disk info": func.Disk()[1],
    "Average load": func.LoadAvg(),
    "CPU info": func.CPU(),
    "Memory info": func.Memory(),
    "Last login": func.Login(),
  });
});

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


try {
  app.listen(43567, () => {
    console.log("Server started at port 43567");
  });
} catch (error) {
  console.log(`Error starting api: ${error}`);
}
