import axios from "axios";

const API_KEY = 'live_EjHzbfxMfvNmIb0A1vYAtO3H8fByy8xAuyP3earydIzjE8qgyzmbVybgiRJNbJkK'

export const catApi = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': API_KEY,      
  },
});