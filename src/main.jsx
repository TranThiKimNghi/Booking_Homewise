import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext.jsx";
// import KeycloakProvider from "./keycloak/KeycloakProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="...."> */}
      <AuthProvider>
        {/* <KeycloakProvider>     */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        {/* </KeycloakProvider> */}
      </AuthProvider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
