import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { SketchPicker } from "react-color";

function App() {
  const [color, setColor] = useState("1fa9f4");
  const [gradient, setGradient] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showCustomToast(`Color copied to clipboard: ${text}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const showCustomToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

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
      {gradient.map((color, index) => (
        <div
          key={index}
          style={{
            padding: "1rem",
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            cursor: "pointer",
          }}
          onClick={() => copyToClipboard(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)}
        >
          rgb({color[0]}, {color[1]}, {color[2]})
        </div>
      ))}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "1rem",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
export default App;
