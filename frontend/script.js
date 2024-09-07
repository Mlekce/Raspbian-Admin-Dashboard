const sys = document.querySelector(".sys");
const avg = document.querySelector(".avg");
const cpu = document.querySelector(".cpu");
const mem = document.querySelector(".mem");
const disk = document.querySelector(".disk");
const net = document.querySelector(".net");
const guageElement = document.querySelector(".gauge");
const guageElement5 = document.querySelector(".gauge5");
const guageElement15 = document.querySelector(".gauge15");

async function getCPU() {
  const res = await fetch("https://192.168.180.136:43567/cpuInfo");
  const data = await res.text();
  return data;
}

async function getMem() {
  const res = await fetch("https://192.168.180.136:43567/memInfo");
  const data = await res.text();
  return data;
}

async function getDisk() {
  const res = await fetch("https://192.168.180.136:43567/diskInfo");
  const data = await res.text();
  return data;
}

async function getSys() {
  const res = await fetch("https://192.168.180.136:43567/systemInfo");
  const data = await res.text();
  return data;
}

async function getAvg() {
  const res = await fetch("https://192.168.180.136:43567/avgLoad");
  const data = await res.text();
  return data;
}

async function netInfo() {
  const res = await fetch("https://192.168.180.136:43567/networkInfo");
  const data = await res.text();
  return data;
}

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
  }
  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round(
    value * 100
  )}%`;
}

function setGaugeValue5(gauge, value) {
  if (value < 0 || value > 1) {
  }
  gauge.querySelector(".gauge__fill5").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover5").textContent = `${Math.round(
    value * 100
  )}%`;
}

function setGaugeValue15(gauge, value) {
  if (value < 0 || value > 1) {
  }
  gauge.querySelector(".gauge__fill15").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover15").textContent = `${Math.round(
    value * 100
  )}%`;
}

setInterval(() => {
  getCPU().then((data) => {
    data = JSON.parse(data);
    const podaci = `
    
        <table class="table table-dark table-striped">
    
            <thead>
                <caption class="h6 caption-top bg-success py-2 text-center text-white">CPU information</caption>
                <tr>
                    <th class="text-start">Model:</th>
                    <td class="text-end">${data["CPU info"].model}</td>
                </tr>
                <tr>
                    <th class="text-start">No. cores:</th>
                    <td class="text-end">${data["CPU info"].cores}</td>
                </tr>
                <tr>
                    <th class="text-start">Speed:</th>
                    <td class="text-end">${data["CPU info"].speed} mhz</td>
                </tr>
                <tr>
                    <th class="text-start">Cache:</th>
                    <td class="text-end">${data["CPU info"].cache}</td>
                </tr>
            </thead>
        </table>
        `;

    cpu.innerHTML = podaci;
    return true;
  });

  getMem().then((data) => {
    data = JSON.parse(data);
    const podaci = `
    
        <table class="table table-dark table-striped">
    
            <thead>
            <caption class="h6 caption-top bg-success py-2 text-center text-white">Memory information</caption>
                
                <tr>
                    <th class="text-start">Memory Ram:</th>
                    <td class="text-end">${data["Memory info"].mem} MB</td>
                </tr>
                <tr>
                    <th class="text-start">Free Ram:</th>
                    <td class="text-end">${data["Memory info"].fmem} MB</td>
                </tr>
                <tr>
                    <th class="text-start">Used Ram:</th>
                    <td class="text-end">${data["Memory info"].usedmem} MB</td>
                </tr>
                <tr>
                    <th class="text-start">Used perc:</th>
                    <td class="text-end">${data["Memory info"].usedPerc} %</td>
                </tr>
                
            </thead>
        </table>
        `;

    mem.innerHTML = podaci;
    return true;
  });

  getDisk().then((data) => {
    data = JSON.parse(data);
    const podaci = `
        <table class="table table-dark table-striped">
            <thead>
            <caption class="h6 caption-top bg-success py-2 text-center text-white">Disk information</caption>
    
                <tr>
                    <th class="text-start">File system:</th>
                    <td class="text-end">${data["Disk info"].Filesystem}</td>
                </tr>
                <tr>
                    <th class="text-start">Disk size:</th>
                    <td class="text-end">${data["Disk info"].Size}</td>
                </tr>
                <tr>
                    <th class="text-start">Disk used:</th>
                    <td class="text-end">${data["Disk info"].Used}</td>
                </tr>
                <tr>
                    <th class="text-start">Disk mounted:</th>
                    <td class="text-end">${data["Disk info"].Mounted}</td>
                </tr>
            </thead>
        </table>
        `;

    disk.innerHTML = podaci;
    return true;
  });

  getSys().then((data) => {
    data = JSON.parse(data);
    const podaci = `
        <table class="table table-dark table-striped">
            <thead>
            <caption class="h6 caption-top bg-success py-2 text-center text-white">System information</caption>
    
                <tr>
                    <th class="text-start">Hostname:</th>
                    <td class="text-end">${data["System info"].hostname}</td>
                </tr>
                <tr>
                    <th class="text-start">Os:</th>
                    <td class="text-end">${data["System info"].os}</td>
                </tr>
                <tr>
                    <th class="text-start">Kernel:</th>
                    <td class="text-end">${data["System info"].kernel}</td>
                </tr>
                <tr>
                    <th class="text-start">Up time:</th>
                    <td class="text-end">${data["System info"].uptime}</td>
                </tr>
                <tr>
                    <th class="text-start">Last boot:</th>
                    <td class="text-end">${data["System info"].lastboot}</td>
                </tr>
                 <tr>
                    <th class="text-start">Users:</th>
                    <td class="text-end">${data["System info"].users}</td>
                </tr>
                <tr>
                    <th class="text-start">Date/Time:</th>
                    <td class="text-end">${data["System info"].time}</td>
                </tr>
            </thead>
        </table>
        `;

    sys.innerHTML = podaci;
    return true;
  });

  netInfo().then((data) => {
    data = JSON.parse(data);
    const podaci = `
        <table class="table table-dark table-striped">
            <thead>
            <caption class="h6 caption-top bg-success py-2 text-center text-white">Network information</caption>
    
                <tr>
                    <th class="text-start">Ethernet:</th>
                    <td class="text-end">${data["Network interfaces"].ens33}</td>
                </tr>
                <tr>
                    <th class="text-start">Loopback:</th>
                    <td class="text-end">${data["Network interfaces"].lo}</td>
                </tr>
                
            </thead>
        </table>
        `;

    net.innerHTML = podaci;
    return true;
  });

  getAvg().then((data) => {
    data = JSON.parse(data);
    setGaugeValue(guageElement, data["Average load"].one);
    setGaugeValue5(guageElement5, data["Average load"].five);
    setGaugeValue15(guageElement15, data["Average load"].fifteen);
    return true;
  });
}, 60000);

(function () {
  getCPU().then((data) => {
    data = JSON.parse(data);
    const podaci = `
      
          <table class="table table-dark table-striped">
      
              <thead>
                  <caption class="h6 caption-top bg-success py-2 text-center text-white">CPU information</caption>
                  <tr>
                      <th class="text-start">Model:</th>
                      <td class="text-end">${data["CPU info"].model}</td>
                  </tr>
                  <tr>
                      <th class="text-start">No. cores:</th>
                      <td class="text-end">${data["CPU info"].cores}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Speed:</th>
                      <td class="text-end">${data["CPU info"].speed} mhz</td>
                  </tr>
                  <tr>
                      <th class="text-start">Cache:</th>
                      <td class="text-end">${data["CPU info"].cache}</td>
                  </tr>
              </thead>
          </table>
          `;

    cpu.innerHTML = podaci;
    return true;
  });

  getMem().then((data) => {
    data = JSON.parse(data);
    const podaci = `
      
          <table class="table table-dark table-striped">
      
              <thead>
              <caption class="h6 caption-top bg-success py-2 text-center text-white">Memory information</caption>
                  
                  <tr>
                      <th class="text-start">Memory Ram:</th>
                      <td class="text-end">${data["Memory info"].mem} MB</td>
                  </tr>
                  <tr>
                      <th class="text-start">Free Ram:</th>
                      <td class="text-end">${data["Memory info"].fmem} MB</td>
                  </tr>
                  <tr>
                      <th class="text-start">Used Ram:</th>
                      <td class="text-end">${data["Memory info"].usedmem} MB</td>
                  </tr>
                  <tr>
                      <th class="text-start">Used perc:</th>
                      <td class="text-end">${data["Memory info"].usedPerc} MB</td>
                  </tr>
                  
              </thead>
          </table>
          `;

    mem.innerHTML = podaci;
    return true;
  });

  getDisk().then((data) => {
    data = JSON.parse(data);
    const podaci = `
          <table class="table table-dark table-striped">
              <thead>
              <caption class="h6 caption-top bg-success py-2 text-center text-white">Disk information</caption>
      
                  <tr>
                      <th class="text-start">File system:</th>
                      <td class="text-end">${data["Disk info"].Filesystem}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Disk size:</th>
                      <td class="text-end">${data["Disk info"].Size}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Disk used:</th>
                      <td class="text-end">${data["Disk info"].Used}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Disk mounted:</th>
                      <td class="text-end">${data["Disk info"].Mounted}</td>
                  </tr>
              </thead>
          </table>
          `;

    disk.innerHTML = podaci;
    return true;
  });

  getSys().then((data) => {
    data = JSON.parse(data);
    const podaci = `
          <table class="table table-dark table-striped">
              <thead>
              <caption class="h6 caption-top bg-success py-2 text-center text-white">System information</caption>
      
                  <tr>
                      <th class="text-start">Hostname:</th>
                      <td class="text-end">${data["System info"].hostname}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Os:</th>
                      <td class="text-end">${data["System info"].os}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Kernel:</th>
                      <td class="text-end">${data["System info"].kernel}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Up time:</th>
                      <td class="text-end">${data["System info"].uptime}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Last boot:</th>
                      <td class="text-end">${data["System info"].lastboot}</td>
                  </tr>
                   <tr>
                      <th class="text-start">Users:</th>
                      <td class="text-end">${data["System info"].users}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Date/Time:</th>
                      <td class="text-end">${data["System info"].time}</td>
                  </tr>
              </thead>
          </table>
          `;

    sys.innerHTML = podaci;
    return true;
  });

  netInfo().then((data) => {
    data = JSON.parse(data);
    const podaci = `
          <table class="table table-dark table-striped">
              <thead>
              <caption class="h6 caption-top bg-success py-2 text-center text-white">Network information</caption>
      
                  <tr>
                      <th class="text-start">Ethernet:</th>
                      <td class="text-end">${data["Network interfaces"].ens33}</td>
                  </tr>
                  <tr>
                      <th class="text-start">Loopback:</th>
                      <td class="text-end">${data["Network interfaces"].lo}</td>
                  </tr>
                  
              </thead>
          </table>
          `;

    net.innerHTML = podaci;
    return true;
  });

  getAvg().then((data) => {
    data = JSON.parse(data);
    setGaugeValue(guageElement, data["Average load"].one);
    setGaugeValue5(guageElement5, data["Average load"].five);
    setGaugeValue15(guageElement15, data["Average load"].fifteen);
    return true;
  });
})();
