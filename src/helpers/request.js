const https = require("https");

function getRequestData(url, render) {
  const req = https.request(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const obj = JSON.parse(data);
      render(obj);
    });
  });

  req.on("error", function onError(err) {
    console.log(err.message);
  });

  req.end();
}

module.exports = {
  getRequestData: getRequestData,
};
