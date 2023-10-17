import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Appf from "./Appf";
import { createRoot } from "react-dom/client";
import './index.css';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Appf />
  </BrowserRouter>
);
