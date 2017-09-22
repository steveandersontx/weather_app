
//Require Json file
const api = require('./api.json');

//{
//  "key" : "67dab9e641237eb5"
//}

//Require https module
const https = require('https');

//Print Error Messages
function printError(e) {
  console.error(e.message);
}

//Function to print message to console
function printMessage(reading) {
  const weatherReport = `The current temperature in ${reading.location.city} is ${reading.current_observation.temp_f} F.`;
  console.log(weatherReport);
}

function getReading(query) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
                            
                            if (response.statusCode === 200) { //if response status Ok, do parsing
                              let body = "";
        
                              // Read the data
                              response.on('data', data => {
                                body += data.toString(); //convert buffer to a String
                                //console.dir(data);
                                //console.log(body);
                              }
                              );
  
                              response.on('end', () => {
                                try {
                                  // Parse the data
                                  const reading = JSON.parse(body); 
                                  //check location before printing
                                  if (reading.location) {
                                    // Print the data
                                    //printMessage(reading.location.city, reading.current_observation.temp_f);
                                    printMessage(reading);
                                  } else {
                                    const queryError = new Error(`Location: "${query}" was not found.`);
                                    printError(queryError);
                                  }
                                  
                                } catch (e) {
                                  //Parse error
                                  printError(e);
                                }
                              }
                              );
                            } else { //Status code error
                              const message = `There was an error getting the reading for ${query} (${http.STATUS_CODES[response.statusCode]})`;
                                //use http module for status codes object
                                const statusCodeError = new Error(message);
                                printError(statusCodeError);
                            }
                          
    }
    );
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (e) {
    printError(e);
  }
}

const query = process.argv.slice(2).join('_').replace(' ','_');
//users.forEach(getReading);
getReading(query);

