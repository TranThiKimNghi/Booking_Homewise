// src/keycloak/Keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://34.177.103.163:7080",
  realm: "booking",
  clientId: "booking-api",   // đổi lại đúng tên client đang có
});

export default keycloak;
