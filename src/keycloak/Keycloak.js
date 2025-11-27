// src/keycloak/Keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080", // URL Keycloak server
  realm: "your-realm",
  clientId: "your-client-id",
});

export default keycloak;
