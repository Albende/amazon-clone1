import axios from "axios";

const instance = axios.create({
  baseURL: "...", //the API url (cloud function)
});
export default instance;
