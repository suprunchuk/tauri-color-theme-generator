import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("1fa9f4");
  const [gradient, setGradient] = useState([]);
  return (
    <div>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          setColor(color);
          console.log(color);
          invoke("generate_gradient", color.rgb).then((grad) => {
            console.log(grad);
            setGradient(grad);
          });
        }}
      />
      {gradient.map((color) => (
        <div
          style={{
            padding: "1rem",
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          }}
        >
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      ))}
    </div>
  );
}

export default App;
