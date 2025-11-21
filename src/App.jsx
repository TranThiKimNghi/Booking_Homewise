import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container py-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
