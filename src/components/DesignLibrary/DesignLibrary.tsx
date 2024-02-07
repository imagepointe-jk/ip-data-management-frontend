import { Route, Routes } from "react-router-dom";
import { DesignLibraryHome } from "./Home";
import { DesignView } from "./DesignView";

export function DesignLibrary() {
  return (
    <Routes>
      <Route path="" element={<DesignLibraryHome />} />
      <Route path=":designId" element={<DesignView />} />
    </Routes>
  );
}
