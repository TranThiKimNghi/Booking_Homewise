import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      {/* Header */}
      <header>
        <div className="container my-3">
          <div className="bg-white rounded shadow p-3">
            <Header />
          </div>
        </div>
      </header>

      {/* App Routes */}
      <main className="flex-fill container my-3">
        <div className="bg-white rounded shadow p-4">
          <AppRoutes />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
