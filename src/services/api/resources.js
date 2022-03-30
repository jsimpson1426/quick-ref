import http from "./http";
import FormData from "form-data";

export async function getResources() {
  return await http.get("/resources", );
}

export async function getResource(id) {
  return await http.get("/resources/" + id);
}

export async function saveResource(data) {

  const {title, description, tags, fileToUpload} = data;
  
  let form = new FormData();

  const headers = { "Content-Type": "multipart/form-data" }

  form.append("title", title);
  form.append("description", description);

  if(tags.length > 0){
    form.append("tags", JSON.stringify(tags));
  }
  
  form.append("file", fileToUpload);

  return await http.post("/resources", form, {headers: headers});
}

export async function editResource(_id, data) {
  const {title, description, tags} = data;
  
  let form = new FormData();
  
  form.append("title", title);
  form.append("description", description);

  if(tags.length > 0){
    form.append("tags", JSON.stringify(tags));
  }

  return await http.put("/resources/" + _id, form);
}

export async function deleteResource(id) {
  return await http.delete("/resources/" + id);
}
