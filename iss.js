const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    const ip = JSON.parse(body);
    if (response.statusCode === 200) {
      callback(null, ip.ip);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};

module.exports = { fetchMyIP };