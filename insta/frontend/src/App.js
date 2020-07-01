import { render } from "react-dom";
import React from "react";
import Base from "./components/base";
import {HashRouter} from 'react-router-dom';

function App() {

  return (
   
    <HashRouter>
      <Base/>
   </HashRouter>
   
  )
}



export default App;

const container = document.getElementById("app");
render(<App />, container);