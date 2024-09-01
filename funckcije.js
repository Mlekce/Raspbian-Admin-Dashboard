const os = require("node:os");
const { execSync } = require("child_process");

function System() {
  const uptime = os.uptime();
  const days = Math.floor(uptime / (24 * 3600));
  const hours = Math.floor((uptime % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const last_boot = execSync("who -b").toString().trim().split(" ").slice(-2);
  const num_of_users = execSync("uptime").toString().split(" ");
  const data = {
    hostname: os.hostname(),
    os: os.platform(),
    kernel: os.release(),
    uptime: `Days: ${days}, Hours: ${hours}, Minutes:${minutes}`,
    lastboot: last_boot[0] + " " + last_boot[1],
    users: num_of_users[6] + " " + num_of_users[7],
    time:
      "Date: " +
      execSync("date +%d-%m-%y").toString().trimEnd() +
      " Time: " +
      execSync("date +%T").toString().trimEnd(),
  };
  return data;
}

function Network() {
  let network = os.networkInterfaces();
  let interfaces = Object.entries(network);
  let data = {};
  for (let i of interfaces) {
    data[i[0]] = i[1][0].address;
  }
  return data;
}

function Disk() {
  const data = execSync("df -h").toString();
  const lines = data.trim().split("\n");
  const headers = lines[0].split(/\s+/);
  const diskInfo = lines.slice(1).map((line) => {
    const parts = line.split(/\s+/);
    return {
      [headers[0]]: parts[0],
      [headers[1]]: parts[1],
      [headers[2]]: parts[2],
      [headers[3]]: parts[3],
      [headers[4]]: parts[4],
      [headers[5]]: parts[5],
    };
  });
  return diskInfo;
}

function loadAvg() {
  const [minute, five, fifteen] = os.loadavg();
  return {
    one: minute,
    five: five,
    fifteen: fifteen,
  };
}

function CPU(){
    const data = execSync("cat /proc/cpuinfo").toString().replace(/\t/g, " ").split("\n");
    return {
        model : data[4].slice(13),
        cores: data[12].slice(12),
        cache : data[8].slice(13),
        speed: data[7].slice(11,15),
    }
}

function Memory(){
    const fmem = Math.round(os.freemem() / 1024 / 1024);
    const mem = Math.round(os.totalmem() / 1024 / 1024);
    const usedmem = Math.round((os.totalmem() - os.freemem()) / 1024 / 1024);

    return {
        mem,
        fmem,
        usedmem,
        usedPerc : 100 - Math.round(fmem / (mem/100))
    }
}

function Login(){
  const val = execSync("last -n 1").toString().split(/\s+/);
  return {
    user: val[0],
    tty: val[1],
    ipAddress: val[2],
    loginDate: val.slice(3,7).join(" "),
    logout: val[7] || null 
  }
}

module.exports = {
  System: System,
  Network: Network,
  Disk: Disk,
  LoadAvg: loadAvg,
  CPU : CPU,
  Memory : Memory,
  Login : Login

};
