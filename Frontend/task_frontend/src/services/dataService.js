// apiService.js

import axios from 'axios';

const dataService = axios.create({
  baseURL: 'http://localhost:9090/api/data/', // Replace with your backend API base URL
});

export const fetchData = async (startTime) => {
  try {  
      
    const response = await dataService.get(`/filter?startTime=${startTime}`); // Make a GET request to fetch data
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred'); // Throw an error with the error message from the API response, if available
  }
};

export default dataService;
