// src/App.jsx (React)
import React from "react";
import ChatWidget from "../src/components/ChatWidget.jsx";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  return <div className="App"></div>;
}

export default App;
