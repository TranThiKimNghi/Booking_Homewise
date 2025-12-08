import { createContext, useContext, useState, useEffect } from "react";
import Keycloak from "keycloak-js";

const KeycloakContext = createContext(null);

export function KeycloakProvider({ children }) {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const kc = new Keycloak({
      url: "http://34.177.103.163:7080", 
      realm: "booking",
      clientId: "booking-api"
    });

    kc.init({ onLoad: "check-sso", checkLoginIframe: false }).then(() => {
      setKeycloak(kc);
    });
  }, []);

  return (
    <KeycloakContext.Provider value={keycloak}>
      {children}
    </KeycloakContext.Provider>
  );
}

export function useKeycloakAuth() {
  return useContext(KeycloakContext);
}


export default KeycloakProvider;
