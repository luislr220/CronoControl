import React from "react";
import ValidarSolis from "./Components/ValidarSolis";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/validar' element={<ValidarSolis/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
