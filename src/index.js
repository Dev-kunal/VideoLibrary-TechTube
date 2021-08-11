import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/UserProvider";
import { VideoProvider } from "./Context/VideoProvider/index";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <AuthProvider>
      <VideoProvider>
        <App />
      </VideoProvider>
    </AuthProvider>
  </Router>,
  rootElement
);
