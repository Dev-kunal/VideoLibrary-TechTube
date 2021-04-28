import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { VideoProvider } from "./Context/reducer";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <VideoProvider>
      <App />
    </VideoProvider>
  </Router>,
  rootElement
);
