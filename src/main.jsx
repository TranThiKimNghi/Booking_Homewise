import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
// import KeycloakProvider from "./keycloak/KeycloakProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <AuthProvider> 
        {/* <KeycloakProvider>     */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        {/* </KeycloakProvider> */}
     </AuthProvider> 
  </React.StrictMode>
);
