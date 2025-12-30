import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
