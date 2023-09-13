import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "../src/component/Home";
import Redirect from "../src/component/Redirect";
import Test from "../src/component/Test";
// import Facebook from "./assets/icons/Rectangle.svg";
// import Gmail from "./assets/icons/email_svgrepo.com.svg";
// import Linkedin from "./assets/icons/Group.svg";
// import Logo from "./assets/images/logo.png";
// import BackgroundImg from "./assets/images/bsidesgoa-bg.png";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  // const handlePlayAudio = () => {
  //   if (audio.paused) {
  //     audio.play();
  //     setIsPlaying(true);
  //   } else {
  //     audio.pause();
  //     setIsPlaying(false);
  //   }
  // };

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
        <Route path="/test" element={<Test />} />

        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
