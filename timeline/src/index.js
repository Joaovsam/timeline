import React from "react";
import ReactDOM from "react-dom/client";
import TimeLineContainer from "./components/TimeLine.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";


function App() {


  return (
    <>
      <ThemeProvider>
        <TimeLineContainer />
      </ThemeProvider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);