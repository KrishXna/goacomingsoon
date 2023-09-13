import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "../src/component/Home";
import Redirect from "../src/component/Redirect";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
      console.log(window.location.pathname);
    };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />

        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
