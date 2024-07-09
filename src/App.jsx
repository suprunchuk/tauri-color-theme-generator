import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("1fa9f4");
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          setColor(color);
        }}
      />
    </div>
  );
}

export default App;
