import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Root() {

  const [dark, setDark] = useState(
    localStorage.getItem("carepulse-theme") === "dark"
  );


  useEffect(() => {

    // Apply DaisyUI theme
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );

    // Apply body dark class
    document.body.classList.toggle(
      "dark-body",
      dark
    );

    // Save theme preference
    localStorage.setItem(
      "carepulse-theme",
      dark ? "dark" : "light"
    );

  }, [dark]);


  return (
    <App
      dark={dark}
      setDark={setDark}
    />
  );

}


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Root />

      {/* =====================================================
          TOASTIFY
      ===================================================== */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>

  </React.StrictMode>

);