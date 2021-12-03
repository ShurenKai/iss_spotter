const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  fetchCoordsByIP(ip, (error, location) => {
    if (error) {
      console.log('Cannot find coordinates at', ip);
      return;
    }
    console.log('oh, you did it!', location);
  });
});