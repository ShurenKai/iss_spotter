const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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
    fetchISSFlyOverTimes(location, (error, locationISS) => {
      if (error) {
        console.log('You are not found at', location);
        return;
      }
      console.log('the ISS will fly over ', locationISS);
    })
  });
});