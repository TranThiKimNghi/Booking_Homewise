import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App({ authenticated }) {
  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <header>
        <div className="container my-3">
          <div className="bg-white rounded shadow p-3">
            <Header isLoggedIn={authenticated} />
          </div>
        </div>
      </header>

      <main className="flex-fill container my-3">
        <div className="bg-white rounded shadow p-4">
          <AppRoutes isLoggedIn={authenticated} />
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
