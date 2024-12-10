import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Success } from "./pages/Index.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
