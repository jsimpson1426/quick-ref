import http from "./http";
import config from "./config.json";

export async function getResources() {
  return await http.get(config.apiEndpoint + "/resources");
}

export async function getResource(id) {
  return await http.get(config.apiEndpoint + "/resources/" + id);
}

export function saveNewResource(data) {
  
}

export function editResource(data) {
  
}
