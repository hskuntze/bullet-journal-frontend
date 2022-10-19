import ReactDOM from "react-dom";
import App from "./App";
import { ThemeManager } from "ThemeManager";

ReactDOM.render(
  <ThemeManager>
    <App />
  </ThemeManager>,
  document.getElementById("root")
);
