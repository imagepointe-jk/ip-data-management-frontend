import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DesignList } from "./components/DesignLibrary/DesignList";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { DesignLibrary } from "./components/DesignLibrary/DesignLibrary";

function App() {
  return (
    <BrowserRouter>
      <div className="main-flex">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-library/*" element={<DesignLibrary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
