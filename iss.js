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

const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`${response.statusCode} is not valid, ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    const location = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
    callback(null, location);
  });
};

const fetchISSFlyOverTimes = function(location, callback) {
  request('https://iss-pass.herokuapp.com/json/?lat=' + location.latitude + '&lon=' + location.longitude, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`${response.statusCode} is not valid, ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    const locationISS = data.response;
    callback(null, locationISS);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        console.log('Cannot find coordinates at', ip);
        return;
      }
      fetchISSFlyOverTimes(location, (error, locationISS) => {
        if (error) {
          console.log('You are not found at', location);
          return;
        }
        callback(null, locationISS);
      });
    });
  });
};

// future reference: module.exports will overwrite one another
module.exports = { nextISSTimesForMyLocation };

//Memories of failure
// let rising = locationISS[0].risetime
// let date = new Date(0)
// let riseTimes = 'Next pass at ' + date.setUTCSeconds(rising) + ' for ' + locationISS[0].duration + ' seconds!'
// callback(null, riseTimes)

