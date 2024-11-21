const axios = require('axios');

const getStatesCities = async (countryName) => {
  const url = `https://countriesnow.space/api/v0.1/countries/states`;

  try {
    // Send POST request with country name
    const response = await axios.post(url, {
      country: countryName
    });

    // Extract the states and cities from the API response
    const states = response.data.length
    console.log(response.data);


    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function with a country name (for example: 'India')
getStatesCities('India'); // Replace 'India' with any country
