// Importing Axios to create a custom HTTP client
import axios from "axios";

// Create an Axios instance with default settings
const client = axios.create({
  // Base URL for all HTTP requests
  baseURL: "http://localhost:7000",

  // Allows sending and receiving cookies across domains
  withCredentials: true,
});

export default client;
