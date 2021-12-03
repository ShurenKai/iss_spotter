const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (let pass in passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(passTimes[pass].risetime);
    const duration = passTimes[pass].duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('Nope, nevermind');
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes }

// Future reference, before the mass deletion
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
//   fetchCoordsByIP(ip, (error, location) => {
//     if (error) {
//       console.log('Cannot find coordinates at', ip);
//       return;
//     }
//     console.log('oh, you did it!', location);
//     fetchISSFlyOverTimes(location, (error, locationISS) => {
//       if (error) {
//         console.log('You are not found at', location);
//         return;
//       }
//       console.log('the ISS will fly over ', locationISS);
//     })
//   });
// });
