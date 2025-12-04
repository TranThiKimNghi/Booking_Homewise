import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);



// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import keycloak from "./keycloak/Keycloak.js";
// import "./index.css"; // nếu bạn có file css

// // Khởi tạo Keycloak 1 lần trước khi render App
// keycloak
//   .init({ 
//     onLoad: "check-sso",
//     // nếu không dùng silent SSO có thể bỏ dòng dưới:
//     // silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
//     checkLoginIframe: false, // giảm bớt lỗi iframe timeout
//   })
//   .then((authenticated) => {
//     ReactDOM.createRoot(document.getElementById("root")).render(
//       <React.StrictMode>
//         <App authenticated={authenticated} />
//       </React.StrictMode>
//     );
//   })
//   .catch((err) => {
//     console.error("Keycloak init failed", err);
//     ReactDOM.createRoot(document.getElementById("root")).render(
//       <React.StrictMode>
//         <App authenticated={false} />
//       </React.StrictMode>
//     );
//   });

